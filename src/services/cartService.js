const { getCartByUserId } = require("../repositories/cartRepository");


async function getCart(userId){
  const cart = await getCartByUserId(userId);

  if(cart) return cart;
  else {
    throw {
      reason: "Cannot find Cart",
      statusCode: 500,
    };
  }
}

module.exports = {
  getCart
}