const express = require("express");
const { isLoggedIn, isAdmin } = require("../validation/authValidator");
const { createNewOrder, cancelOrderById, changeOrderStatus, getOrderById, getAllOrdersByUser } = require("../controllers/orderController");

const orderRouter = express.Router();

orderRouter.post('/', isLoggedIn, createNewOrder);
orderRouter.get('/', isLoggedIn, getAllOrdersByUser);
orderRouter.get('/:orderId', isLoggedIn, getOrderById);

// Put request is used to modify results

orderRouter.put('/:orderId/cancel', isLoggedIn, cancelOrderById);
orderRouter.put('/:orderId/status', isLoggedIn, isAdmin, changeOrderStatus);

module.exports = orderRouter;