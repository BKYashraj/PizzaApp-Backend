const Order = require("../schema/orderSchema");

async function createNewOrder(orderDetails) {
  try {
    const order = await Order.create(orderDetails);
    return order;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createNewOrder
}