const dotenv = require("dotenv");
dotenv.config({ path: [`.env.${process.env.NODE_ENV}`] });
// Update with your config settings.

const config = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      tableName: "migrations",
      directory: "./src/migrations/db",
      extension: "ts",
      loadExtensions: [".ts"],
    },
    seeds: {
      directory: "./src/migrations/seed",
      extension: "ts",
      loadExtensions: [".ts"],
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};

module.exports = config;
