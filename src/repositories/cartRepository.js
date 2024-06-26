const Cart = require("../schema/cartSchema");

async function createCart(userId) {
  try {
    const newCart = await Cart.create({
      user: userId,
    });
    return newCart;
  } catch (error) {
    console.error(error);
  }
}

async function getCartByUserId(userId) {
  try {
    const newCart = await Cart.findOne({
      user: userId,
    }).populate("items.product"); // populate is used to fetch all info about the product
    return newCart;
  } catch (error) {
    console.error(error);
  }
}


module.exports = {
  createCart,
  getCartByUserId
};
