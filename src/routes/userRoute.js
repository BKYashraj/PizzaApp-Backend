const express = require('express');
const { createUser } = require('../controllers/userController');

// We have to initialise a router object to add routes in a new file
// Routers are used for segregating your routes in different modules

const userRouter = express.Router();


userRouter.post('/', createUser)


// Route maps a client request to a correct controller


module.exports = userRouter; // Exporting the Router For Server