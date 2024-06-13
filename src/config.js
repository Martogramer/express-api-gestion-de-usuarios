// config.js
require("dotenv").config();
const TOKEN = process.env.ACCESS_TOKEN;
const APP_URL = process.env.APP_URL;
module.exports = {
    ACCESS_TOKEN: {TOKEN},
    APP_URL: {APP_URL} // URL de tu aplicación React
  };
  