const Order = require("../schema/orderSchema");

async function createNewOrder(orderDetails) {
  try {
    const order = await Order.create(orderDetails);
    return order;
  } catch (error) {
    console.log(error);
  }
}

async function getOrdersByUserId(userId) {
  try {
    const orders = await Order.find({ user: userId }).populate("items.product");
    return orders;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function getOrderById(orderId) {
  try {
    const order = await Order.findById(orderId).populate('items.product');
    return order;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function updateOrderStatus(orderId, status) {
  try {
    const order = await Order.findByIdAndUpdate(orderId, { status: status }, {new:true});
    // Because of {new:true} mongoose send updated object as a response

    return order;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

module.exports = {
  createNewOrder,
  getOrdersByUserId,
  getOrderById,
  updateOrderStatus
};
