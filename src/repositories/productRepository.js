const Product = require("../schema/productSchema");

async function createProduct(productDetails) {
  try {
    const response = await Product.create(productDetails);
    return response;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error; // Throw the error to handle it in the calling function
  }
}

async function findProductById(productId) {
  try {
    const response = await Product.findById(productId);
    if (!response) {
      throw new Error("Product not found");
    }
    return response;
  } catch (error) {
    console.error("Error finding product by ID:", error);
    throw error; // Throw the error to handle it in the calling function
  }
}

async function getAllProducts({ page = 1, limit = 5 }) {
  try {
    const products = await Product.find({})
                                  .skip((page - 1) * limit)
                                  .limit(limit);
    return products;
  } catch (error) {
    console.error("Error getting all products:", error);
    throw error; // Throw the error to handle it in the calling function
  }
}

async function deleteProductById(productId) {
  try {
    const response = await Product.findByIdAndDelete(productId);
    if (!response) {
      throw new Error("Product not found or already deleted");
    }
    return response;
  } catch (error) {
    console.error("Error deleting product by ID:", error);
    throw error; // Throw the error to handle it in the calling function
  }
}

module.exports = {
  createProduct,
  findProductById,
  getAllProducts,
  deleteProductById,
};
