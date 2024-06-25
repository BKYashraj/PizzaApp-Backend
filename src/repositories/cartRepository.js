const Cart = require("../schema/cartSchema");

async function createCart(userId){
  try {
    const newCart = await Cart.create({
      user: userId
    });
    return newCart;

  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createCart
}