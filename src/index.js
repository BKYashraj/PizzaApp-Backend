const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const ServerConfig = require('./config/serverConfig')
const connectDB = require('./config/dbConfig')
const User = require('./schema/userSchema')
const userRouter = require('./routes/userRoute')
const cartRouter = require('./routes/userRoute')
const authRouter = require('./routes/authRoute')
const productRouter = require('./routes/productRouter')

const app = express()


app.use(cookieParser()); // It is for accessing cookies on server

// If request is in JSON, text, urlencoded it correctly reads by Express Server
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded());
 
app.use('/users', userRouter) ; // Connects Router to the Server
app.use('/carts', cartRouter) ;
app.use('/auth', authRouter) ;
app.use('/products', productRouter) ;

app.listen(ServerConfig.PORT, async () => {
  await connectDB();
  console.log(`Example app listening on port ${ServerConfig.PORT}...`);
})



