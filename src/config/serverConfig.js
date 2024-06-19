const dotenv = require('dotenv')
dotenv.config()  // This line read .env file line by line

module.exports = {
  PORT: process.env.PORT
}