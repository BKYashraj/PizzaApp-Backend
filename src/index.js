const express = require('express')
const bodyParser = require('body-parser')
const ServerConfig = require('./config/serverConfig')
const connectDB = require('./config/dbConfig')
const User = require('./schema/userSchema')
const userRouter = require('./routes/userRoute')
const cartRouter = require('./routes/userRoute')
const authRouter = require('./routes/authRoute')

const app = express()

// If request is in JSON, text, urlencoded it correctly reads by Express Server
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded());

app.use('/users', userRouter) ; // Connects Router to the Server
app.use('/carts', cartRouter) ;
app.use('/auth', authRouter) ;

app.listen(ServerConfig.PORT, async () => {
  await connectDB();
  console.log(`Example app listening on port ${ServerConfig.PORT}...`)

// This is for testing purpose of User Model
// const newUser = await User.create({
//   email: 'newuser@example.com',
//   password: '12234555',
//   firstName: 'Yashraj',
//   lastName:'Desale',
//   mobileNumber:'2898756554'
// })

// console.log("New User Created")
})

// New

