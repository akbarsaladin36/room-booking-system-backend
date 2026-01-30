// Update with your config settings.
const dotenv = require('dotenv')
dotenv.config()

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME
    },
    migrations: {
      directory: __dirname + '/src/migrations'
    },
    seeds: {
      directory: __dirname + '/src/seeders'
    }
  },
  production: {
    client: 'mysql2',
    connection: {
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME
    },
    migrations: {
      directory: __dirname + '/src/migrations'
    },
    seeds: {
      directory: __dirname + '/src/seeders'
    }
  }
};
