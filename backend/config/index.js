const path = require('path');
const envPath = path.resolve(__dirname, '../.env');
require('dotenv').config({path: envPath});

module.exports = {
  production: {
    HOST: process.env.PROD_DB_HOST,
    USER: process.env.PROD_DB_USERNAME,
    PASSWORD: process.env.PROD_DB_PASSWORD,
    DB: process.env.PROD_DB_DATABASE,
    dialect: process.env.PROD_DB_DIALECT,
    
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  development: {
    database: process.env.DEV_DB_DATABASE,
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORT,
    dialect: process.env.DEV_DB_DIALECT,
    pool: {
      max: 40,
      min: 0,
      acquire: 50000,
      idle: 20000
    }
  },
  testing: {
    database: process.env.TEST_DB_DATABASE,
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    host: process.env.TEST_DB_HOST,
    port: process.env.TEST_DB_PORT,
    dialect: process.env.TEST_DB_DIALECT,
  },
  };