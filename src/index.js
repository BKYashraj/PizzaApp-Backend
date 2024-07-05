const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const bodyParser = require('body-parser')
const ServerConfig = require('./config/serverConfig')
const connectDB = require('./config/dbConfig')
const User = require('./schema/userSchema')
const userRouter = require('./routes/userRoute')
const cartRouter = require('./routes/cartRoute')
const authRouter = require('./routes/authRoute')
const productRouter = require('./routes/productRouter')
const { isLoggedIn } = require('./validation/authValidator')
const orderRouter = require('./routes/orderRoute')


const app = express()

app.use(cors({
  origin: 'https://pizzayashrajfrontend.netlify.app/',
  credentials: true,
}));

app.use(cookieParser()); // It is for accessing cookies on server ( When User sends request it also contain token to read that token we use cookie parser)

// If request is in JSON, text, urlencoded it correctly reads by Express Server
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded());
 
app.use('/users', userRouter) ; // Connects Router to the Server
app.use('/carts', cartRouter) ;
app.use('/auth', authRouter) ;
app.use('/products', productRouter) ;
app.use('/orders', orderRouter) ;

app.get('/ping', (req, res) => {
  // controller
  console.log(req.body);
  console.log(req.cookies);
  return res.json({message: "pong"});
});

app.listen(ServerConfig.PORT, async () => {
  await connectDB();
  console.log(`Example app listening on port ${ServerConfig.PORT}...`);
})



