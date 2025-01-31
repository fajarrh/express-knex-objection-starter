const dotenv = require("dotenv");
dotenv.config({ path: [`.env`] });
// Update with your config settings.

const config = {
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
};

module.exports = config;
