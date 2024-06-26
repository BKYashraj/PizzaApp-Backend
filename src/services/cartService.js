const { getCartByUserId, clearCart } = require("../repositories/cartRepository");
const { findProductById } = require("../repositories/productRepository");

async function getCart(userId) {
  const cart = await getCartByUserId(userId);

  if (cart) return cart;
  else {
    throw {
      reason: "Cannot find Cart",
      statusCode: 500,
    };
  }
}

async function modifyCart(userId, productId, shouldAdd = true) {
  const quantityValue = (shouldAdd == true) ? 1 : -1;
  const cart = await getCart(userId);
  const product = await findProductById(productId);

  if (!cart) {
    throw {
      reason: "Cannot find Cart",
      statusCode: 500,
    };
  }
  if (!product) {
    throw {
      reason: "Cannot find Product",
      statusCode: 500,
    };
  }
  if (!product.instock && product.quantity <= 0) {
    throw {
      reason: "Product Out of Stock",
      statusCode: 500,
    };
  }

  // Check if the product is already in the cart

  let foundProduct = false;

  cart.items.forEach((item) => {
    if (item.product._id == productId) {
      if (shouldAdd) {
        if (product.quantity >= item.quantity + 1)
          item.quantity += quantityValue;
        else
          throw {
            reason: "Product Out of Stock",
            statusCode: 404,
          };
      } else {
        if (item.quantity > 0){
          item.quantity += quantityValue;
          if (item.quantity == 0){
            cart.items = cart.items.filter(item => item.product._id != productId);
            foundProduct = true;
            return;
          }
        } 
        else throw {
            reason: "Product Out of Stock",
            statusCode: 404,
          };  
      }
      foundProduct = true;
    }
  });

  if (!foundProduct) {
    if (shouldAdd) {
      cart.items.push({ product: productId, quantity: 1 });
    } else {
      throw {
        reason: "Product in the cart",
        statusCode: 404,
      };
    }
  }

  await cart.save();

  return cart;
}

async function clearproductsFromCart(userId) {
  const response = await clearCart(userId);
  return response;
}

module.exports = {
  getCart,
  modifyCart,
  clearproductsFromCart
};
