const dotenv = require("dotenv").config();
module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DEV,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },// untuk mengambil data dari .env file untuk mengambil data dari database development 
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_TEST,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },// untuk mengambil data dari .env file untuk mengambil data dari database test
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_PRODUCTION,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },// untuk mengambil data dari .env file untuk mengambil data dari database production
};
