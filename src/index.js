const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const ServerConfig = require('./config/serverConfig')
const connectDB = require('./config/dbConfig')
const User = require('./schema/userSchema')
const userRouter = require('./routes/userRoute')
const cartRouter = require('./routes/userRoute')
const authRouter = require('./routes/authRoute')

const uploader = require('./middlewares/multerMiddleware')
const cloudinary = require('./config/cloudinaryConfig')
const fs = require('fs/promises'); // After uploading image at multer we delete that image from server

const app = express()

app.use(cookieParser()); // It is for accessing cookies on server

// If request is in JSON, text, urlencoded it correctly reads by Express Server
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded());

app.use('/users', userRouter) ; // Connects Router to the Server
app.use('/carts', cartRouter) ;
app.use('/auth', authRouter) ;


// app.post('/ping', function (req, res) {
//   console.log(req.body);
//   console.log(req.cookies);
//   return res.json({ message:"Yashraj"});
// })

app.post('/photo', uploader.single('incomingFile'), async (req, res) => {
  console.log(req.file);
  const result = await cloudinary.uploader.upload(req.file.path);
  console.log("result from cloudinary", result);
  await fs.unlink(req.file.path); // After uploading image at multer we delete that image from server
  return res.json({message: 'ok'});
})

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

