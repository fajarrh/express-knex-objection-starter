import redis from "@config/redis";

interface Job {
  id: string;
  task: string;
  data: any;
  retries?: number;
  priority?: number;
}

interface ProcessOptions {
  concurrency?: number;
  retryCount?: number;
  delay?: number;
}

export default class Queue {
  private queueName: string;
  private db: number;
  private concurrency: number;
  private retryCount: number;
  private delay: number;
  private processing: Set<string>;

  constructor(queueName: string, db: number = 0) {
    this.queueName = queueName;
    this.db = db;
    this.concurrency = 1; // Default concurrency
    this.retryCount = 3; // Default retry count
    this.delay = 0; // Default delay in milliseconds
    this.processing = new Set(); // Track jobs in processing
  }

  /**
   * Add a job to the queue with a priority.
   * @param job - The job to be added.
   * @param priority - Priority of the job (lower is higher priority).
   */
  async add(job: Job, priority: number = 0): Promise<void> {
    try {
      const jobData = { ...job, retries: 0, priority };
      const serializedJob = JSON.stringify(jobData);
      await redis.select(this.db);
      await redis.zadd(this.queueName, priority, serializedJob);
      console.log(`Job added to queue: ${JSON.stringify(jobData)} with priority ${priority}`);
    } catch (error) {
      console.error("Failed to add job to queue:", error);
    }
  }

  /**
   * Pop the highest-priority job from the queue.
   * @returns The job with the highest priority or null if the queue is empty.
   */
  async popJob(): Promise<Job | null> {
    try {
      await redis.select(this.db);
      const jobData = await redis.zrange(this.queueName, 0, 0); // Get the first element
      if (jobData.length > 0) {
        await redis.zrem(this.queueName, jobData[0]); // Remove it from the queue
        return JSON.parse(jobData[0]) as Job;
      }
      return null;
    } catch (error) {
      console.error("Failed to pop job from queue:", error);
      throw error;
    }
  }

  /**
   * Process jobs from the queue.
   * @param processJobCallback - The callback function to process each job.
   * @param options - Options for processing (concurrency, retryCount, delay).
   */
  async process(
    processJobCallback: (job: Job) => Promise<void>,
    options: ProcessOptions = {}
  ): Promise<void> {
    const { concurrency = 1, retryCount = 3, delay = 0 } = options;

    this.concurrency = concurrency;
    this.retryCount = retryCount;
    this.delay = delay;

    const workers: Promise<void>[] = [];
    for (let i = 0; i < this.concurrency; i++) {
      workers.push(this.worker(processJobCallback));
    }

    await Promise.all(workers);
  }

  private async worker(processJobCallback: (job: Job) => Promise<void>): Promise<void> {
    while (true) {
      try {
        const job = await this.popJob();
        if (job) {
          if (this.processing.has(job.id)) {
            console.log(`Skipping duplicate job: ${JSON.stringify(job)}`);
            continue;
          }

          this.processing.add(job.id);
          console.log(`Processing job: ${JSON.stringify(job)}`);

          try {
            await processJobCallback(job);
            console.log(`Job completed: ${JSON.stringify(job)}`);
          } catch (error) {
            console.error(`Error processing job: ${JSON.stringify(job)}`, error);

            // Retry logic
            if (job.retries! < this.retryCount) {
              job.retries = (job.retries || 0) + 1;
              console.log(
                `Retrying job: ${JSON.stringify(job)} (${job.retries}/${this.retryCount})`
              );
              await this.add(job, job.priority!); // Re-add the job to the queue
            } else {
              console.log(`Job failed permanently: ${JSON.stringify(job)}`);
            }
          } finally {
            this.processing.delete(job.id);
          }

          if (this.delay > 0) {
            await new Promise((resolve) => setTimeout(resolve, this.delay));
          }
        } else {
          console.log("No jobs in the queue");
          await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait before checking again
        }
      } catch (error) {
        console.error("Error in worker:", error);
      }
    }
  }
}
