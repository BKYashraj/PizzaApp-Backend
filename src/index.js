const express = require('express')
const ServerConfig = require('./config/serverConfig')
const connectDB = require('./config/dbConfig')

const app = express()

app.listen(ServerConfig.PORT, async () => {
  await connectDB();
  console.log(`Example app listening on port ${ServerConfig.PORT}...`)
})

// 1GDPLFJmCUZRvS7W
// yashrajdesale1