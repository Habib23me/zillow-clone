// Update with your config settings.

import config from "../utils/config";
export = {
  development: {
    client: "pg",
    connection: {
      database: "zillow",
      user: "postgres",
      password: "root",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  staging: {
    client: "pg",
    connection: config.DATABASE_URL,
    migrations: {
      tableName: "knex_migrations",
    },
    pool: {
      min: 2,
      max: 10,
    },
    ssl: true,
  },
  production: {
    client: "pg",
    connection: config.DATABASE_URL,
    migrations: {
      tableName: "knex_migrations",
    },
    pool: {
      min: 2,
      max: 10,
    },
    ssl: true,
  },
};
