// import { Knex, Env } from "./src/config";
// export default Env.isUnitTest ? Knex.test : Knex.config;

// require("ts-node/register");
// const { Knex, Env } = require("./src/config");
// module.exports = Env.isUnitTest ? Knex.test : Knex.config;

const { loadEnvConfig } = require("@next/env");

const dev = process.env.NODE_ENV !== "production";
const { DB_TYPE, DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = loadEnvConfig(
  "./",
  dev
).combinedEnv;

module.exports = {
  client: DB_TYPE,
  connection: {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "./knex/migrations",
  },
  seeds: {
    directory: "./knex/seeds",
  },
};
