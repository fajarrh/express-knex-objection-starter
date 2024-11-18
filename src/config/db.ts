import knex, { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config({ path: [`.env.${process.env.NODE_ENV}`, ".env"] });

const config: knex.Knex.Config = {
  client: "pg",
  debug: true,
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  pool: {
    min: 2,
    max: 10,
    log: (message, level) => {
      console.log("pool message: ", message);
      console.log("pool level", level);
    },
  },
  log: {
    warn(message) {
      console.warn("WARN", message);
    },
    error(message) {
      console.error("ERROR", message);
    },
    deprecate(message) {
      console.info("DEPRECATE", message);
    },
    debug(msg) {
      console.log("DEBUG", msg);
    },
    enableColors: true,
  },
  compileSqlOnError: false,
};

knex.QueryBuilder.extend("paginate", function (page, perPage): any {
  const offset = (page - 1) * perPage;
  return Promise.all([
    this.clone().clearSelect().clearOrder().count(),
    this.offset(offset).limit(perPage),
  ]);
});

knex.QueryBuilder.extend("when", function (value, query, next) {
  if (!value && !next) return this;
  if (!value && next) return next(this);
  query(this, value);
  return this;
});

export default knex(config);
