const express = require('express')
const ServerConfig = require('./config/serverConfig')

const app = express()

app.listen(ServerConfig.PORT, () => {
  console.log(`Example app listening on port ${ServerConfig.PORT}...`)
})
