import redis from "@config/redis";

export default class RedisUtils {
  /**
   * Select a Redis database
   * @param db - The database index (0, 1, 2, ...)
   */
  static async selectDb(db: number): Promise<void> {
    try {
      await redis.select(db);
      console.log(`Switched to database ${db}`);
    } catch (error) {
      console.error(`Failed to switch to database ${db}:`, error);
    }
  }

  /**
   * Set data in Redis
   * @param db - The Redis database number
   * @param key - The key for the data
   * @param value - The value to store
   * @param ttl - Time to live in seconds (optional)
   */
  static async set(
    db: number,
    key: string,
    value: string,
    ttl?: number
  ): Promise<void> {
    try {
      await this.selectDb(db);
      if (ttl) {
        await redis.set(key, value, "EX", ttl);
      } else {
        await redis.set(key, value);
      }
      console.log(`Key "${key}" set successfully in database ${db}`);
    } catch (error) {
      console.error(`Failed to set key "${key}" in database ${db}:`, error);
    }
  }

  /**
   * Get data from Redis
   * @param db - The Redis database number
   * @param key - The key to retrieve data for
   * @returns The stored value or null if the key does not exist
   */
  static async get(db: number, key: string): Promise<string | null> {
    try {
      await this.selectDb(db);
      const value = await redis.get(key);
      if (value === null) {
        console.log(`Key "${key}" not found in database ${db}`);
      }
      return value;
    } catch (error) {
      console.error(`Failed to get key "${key}" in database ${db}:`, error);
      throw error;
    }
  }

  /**
   * Delete a key from Redis
   * @param db - The Redis database number
   * @param key - The key to delete
   */
  static async del(db: number, key: string): Promise<void> {
    try {
      await this.selectDb(db);
      const result = await redis.del(key);
      console.log(
        `Key "${key}" deleted in database ${db}:`,
        result > 0 ? "Success" : "Not Found"
      );
    } catch (error) {
      console.error(`Failed to delete key "${key}" in database ${db}:`, error);
    }
  }

  /**
   * Update a key's value in Redis
   * @param db - The Redis database number
   * @param key - The key to update
   * @param newValue - The new value to set for the key
   */
  static async update(
    db: number,
    key: string,
    newValue: string
  ): Promise<void> {
    try {
      await this.selectDb(db);
      const exists = await redis.exists(key);
      if (exists === 1) {
        await redis.set(key, newValue);
        console.log(`Key "${key}" updated successfully in database ${db}`);
      } else {
        console.log(`Key "${key}" does not exist in database ${db}`);
      }
    } catch (error) {
      console.error(`Failed to update key "${key}" in database ${db}:`, error);
    }
  }

  /**
   * Set a session in Redis
   * @param db - The Redis database number
   * @param key - The user ID for the session
   * @param value - The session data to store (JSON object)
   */
  static async setSession<T = any>(
    db: number,
    key: string,
    value: T
  ): Promise<void> {
    try {
      await this.selectDb(db);
      const _key = `session:${key}`;
      const ttl = 30 * 24 * 60 * 60; // 30 days in seconds
      const valueString = JSON.stringify(value);

      await redis.set(_key, valueString, "EX", ttl);
      console.log(
        `Session for user "${_key}" set in database ${db} successfully`
      );
    } catch (error) {
      console.error(
        `Failed to set session for user "${key}" in database ${db}:`,
        error
      );
    }
  }

  /**
   * Get a session from Redis
   * @param db - The Redis database number
   * @param key - The user ID for the session
   * @returns The session data as a JSON object or null if the session does not exist
   */
  static async getSession<T = any>(db: number, key: string): Promise<T | null> {
    try {
      await this.selectDb(db);
      const _key = `session:${key}`;
      const value = await redis.get(_key);

      if (value === null) {
        console.log(`Session for user "${_key}" not found in database ${db}`);
        return null;
      }

      return JSON.parse(value);
    } catch (error) {
      console.error(
        `Failed to get session for user "${key}" in database ${db}:`,
        error
      );
      throw error;
    }
  }

  /**
   * Push an item to the end of a Redis list.
   * @param db - The Redis database number
   * @param key - The Redis key for the list.
   * @param value - The item to push (will be stringified if not a string).
   */
  static async pushToList(db: number, key: string, value: any): Promise<void> {
    try {
      await this.selectDb(db);
      const serializedValue =
        typeof value === "string" ? value : JSON.stringify(value);
      await redis.rpush(key, serializedValue);
      console.log(`Pushed item to list "${key}" in database ${db}`);
    } catch (error) {
      console.error(
        `Failed to push to list "${key}" in database ${db}:`,
        error
      );
    }
  }

  /**
   * Pop an item from the start of a Redis list.
   * @param db - The Redis database number
   * @param key - The Redis key for the list.
   * @returns The first item in the list (parsed if JSON), or null if the list is empty.
   */
  static async popFromList(db: number, key: string): Promise<any> {
    try {
      await this.selectDb(db);
      const value = await redis.lpop(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(
        `Failed to pop from list "${key}" in database ${db}:`,
        error
      );
      throw error;
    }
  }

  /**
   * Get all items in a Redis list.
   * @param db - The Redis database number
   * @param key - The Redis key for the list.
   * @returns An array of items (parsed if JSON).
   */
  static async getList(db: number, key: string): Promise<any[]> {
    try {
      await this.selectDb(db);
      const values = await redis.lrange(key, 0, -1);
      return values.map((value) => JSON.parse(value));
    } catch (error) {
      console.error(`Failed to get list "${key}" in database ${db}:`, error);
      throw error;
    }
  }

  /**
   * Remove a specific item from a Redis list.
   * @param db - The Redis database number
   * @param key - The Redis key for the list.
   * @param predicate - A function to determine which items to remove.
   */
  static async removeFromList(
    db: number,
    key: string,
    predicate: (item: any) => boolean
  ): Promise<void> {
    try {
      await this.selectDb(db);
      const items = await this.getList(db, key);
      const filteredItems = items.filter((item) => !predicate(item));

      // Clear the list and re-add the filtered items
      await redis.del(key);
      for (const item of filteredItems) {
        await this.pushToList(db, key, item);
      }
    } catch (error) {
      console.error(
        `Failed to remove from list "${key}" in database ${db}:`,
        error
      );
    }
  }

  /**
   * Flush the current Redis database.
   * @param db - The Redis database number
   */
  static async flushDb(db: number): Promise<void> {
    try {
      await this.selectDb(db);
      await redis.flushdb();
      console.log(`Flushed database ${db} successfully`);
    } catch (error) {
      console.error(`Failed to flush database ${db}:`, error);
    }
  }

  /**
   * Flush all Redis databases.
   */
  static async flushAll(): Promise<void> {
    try {
      await redis.flushall();
      console.log(`Flushed all databases successfully`);
    } catch (error) {
      console.error(`Failed to flush all databases:`, error);
    }
  }
}
