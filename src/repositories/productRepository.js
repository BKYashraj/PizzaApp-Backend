const Product = require("../schema/productSchema");

async function addProduct(productDetails){
  try {
    const response = await Product.create(productDetails);
    return response;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  addProduct
}