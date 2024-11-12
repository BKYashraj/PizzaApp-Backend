const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const ServerConfig = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
const axios = require('axios');  // Add axios for making HTTP requests

const User = require('./schema/userSchema');
const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');
const authRouter = require('./routes/authRoute');
const productRouter = require('./routes/productRouter');
const { isLoggedIn } = require('./validation/authValidator');
const orderRouter = require('./routes/orderRoute');
const payment = require('./routes/payment');

const app = express();

app.use(cors({
  origin: ServerConfig.ORIGIN_LINK,
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('/carts', cartRouter);
app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use('/api/payment', payment);

app.get('/ping', (req, res) => {
  console.log(req.body);
  console.log(req.cookies);
  return res.json({ message: "pong" });
});

app.listen(ServerConfig.PORT, async () => {
  await connectDB();
  console.log(`Example app listening on port ${ServerConfig.PORT}...`);

  Auto-request to keep the server alive
  setInterval(() => {
    axios.get(`https://pizzaapp-backend-nvm3.onrender.com/ping`)
      .then(() => console.log('Auto-ping sent to keep the server alive.'))
      .catch(error => console.error('Error in auto-ping:', error.message));
  }, 10 * 60 * 1000);  // Every 10 minutes
});
