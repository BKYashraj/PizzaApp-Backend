const {
  clearCart,
  getCartByUserId,
} = require("../repositories/cartRepository");
const { createNewOrder, getOrdersByUserId, getOrderById, updateOrderStatus } = require("../repositories/orderRepository");
const { findUser } = require("../repositories/userRepository");

async function createOrder(userId, paymentMethod) {
  const cart = await getCartByUserId(userId);
  const user = await findUser({ _id: cart.user });

  if (!cart) {
    throw {
      reason: "Cannot find Cart",
      statusCode: 500,
    };
  }

  if (cart.items.length == 0) {
    throw {
      reason: "Cart is empty, please add some items to the cart",
      statusCode: 500,
    };
  }

  const orderObject = {};

  orderObject.user = cart.user;
  orderObject.items = cart.items.map((cartitem) => {
    return { product: cartitem.product._id, quantity: cartitem.quantity };
  });

  orderObject.status = "ORDERED";
  orderObject.totalPrice = 0;

  cart.items.forEach((cartItem) => {
    orderObject.totalPrice += cartItem.quantity * cartItem.product.price;
  });

  orderObject.address = user.address;
  orderObject.paymentMethod = paymentMethod;

  const order = await createNewOrder(orderObject);

  if (!order) {
    throw {
      reason: "Cannot create Order",
      statusCode: 500,
    };
  }

  await clearCart(userId);

  return order;
}

async function getAllOrdersCreatedByUsers(userId) {
  const orders = await getOrdersByUserId(userId);
  if(!orders){
    throw {
      reason: "Cannot find Orders", 
      statusCode: 500
    }
  }
  return orders;
}

async function getOrderDetailById(orderId) {
  const order = await getOrderById(orderId);
  if(!order){
    throw {
      reason: "Cannot find Orders", 
      statusCode: 500
    }
  }
  return order;
}

async function updateOrder(orderId, status) {
  const order = await updateOrderStatus(orderId, status);
  if(!order){
    throw {
      reason: "Cannot find Orders", 
      statusCode: 500
    }
  }
  return order;
}


module.exports = {
  createOrder,
  getAllOrdersCreatedByUsers,
  getOrderDetailById,
  updateOrder
};
