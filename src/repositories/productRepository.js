const Product = require("../schema/productSchema");

async function createProduct(productDetails){
  try {
    const response = await Product.create(productDetails);
    return response;
  } catch (error) {
    console.error(error);
  }
}

async function findProductById(productId) { 
  try {
    const response = await Product.findById(productId);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getAllProducts({ page = 1, limit = 10 }) {
  try {
    const products = await Product.find({})
                                  .skip((page - 1) * limit)
                                  .limit(limit);
    return products;
  } catch (error) {
    console.log(error);
  }
}

async function deleteProductById(productId) { 
  try {
    const response = await Product.findByIdAndDelete(productId);
    return response;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createProduct,
  findProductById,
  deleteProductById,
  getAllProducts
}