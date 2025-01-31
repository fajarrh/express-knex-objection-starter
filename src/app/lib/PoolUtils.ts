import { Pool } from "pg";

export default class PoolUtils {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT || "5432"),
      max: parseInt(process.env.DB_MAX_CONNECTIONS || "10"),
      idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT || "30000"),
      connectionTimeoutMillis: parseInt(
        process.env.DB_CONNECTION_TIMEOUT || "2000"
      ),
    });
  }

  async runQuery(query: string, params?: any[]): Promise<any> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(query, params);
      return result.rows;
    } catch (err) {
      console.error("Query failed:", err);
      throw err;
    } finally {
      client.release();
    }
  }

  async closePool(): Promise<void> {
    await this.pool.end();
    console.log("Connection pool closed");
  }
}
