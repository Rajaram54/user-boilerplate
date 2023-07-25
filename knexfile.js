const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './.env') })
module.exports = {
    development: {
      client: 'pg',
      connection: {
        host: process.env.HOST,
        port: process.env.DBPORT,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
      },
      migrations: {
        directory: './db/migrations',
      },
      seeds: {
        directory: './db/seeds',
      },
    },
    production: {
      client: 'pg',
      connection: {
        host: process.env.HOST,
        port: process.env.DBPORT,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        ssl: true,
      },
      migrations: {
        directory: './db/migrations',
      },
      seeds: {
        directory: './db/seeds',
      },
    },
  };
  