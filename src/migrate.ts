import db from "@config/db";
import path from "path";

export const migrate = async () => {
  console.log("RUN Migration");
  try {
    const res = await db.migrate.latest({
      directory: [path.join(__dirname, "/migrations/db")],
      tableName: "migrations",
      schemaName: process.env.DB_SCHEMA,
      database: process.env.DB_NAME,
    });

    console.log("MIGRATE SUCCESS", (res || []).length);
  } catch (e: any) {
    console.log("error migrate", e?.message);
  } finally {
    console.log("ALL MIGRATION HAS RUN");
  }
};
