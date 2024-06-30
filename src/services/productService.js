const cloudinary = require("../config/cloudinaryConfig");
const productRepository = require('../repositories/productRepository');
const fs = require("fs/promises"); // After uploading image at multer we delete that image from server
const { findProductById, deleteProductById } = require("../repositories/productRepository");

async function createProduct(productDetails) {
  // 1. We should check if an image is coming to create the product, then we should first upload it on
  // cloudinary

  const imagePath = productDetails.imagePath;
  if (imagePath) {
    try {
      const cloudinaryResponse = await cloudinary.uploader.upload(imagePath);

      var productImage = cloudinaryResponse.secure_url;
      await fs.unlink(imagePath);
    } catch (error) {
      console.log(error);
      throw { reason: "Not able to create product", statusCode: 500 };
    }
  }

  // 2. Then use the url from cloudinary and other propduct details to add product in db

  const product = await productRepository.createProduct({
    ...productDetails,
    productImage: productImage,
  });

  if (!product) {
    throw { reason: "Not able to create product", statusCode: 500 };
  }

  return product;
}

async function addProduct(productId) {
    const product = await findProductById(productId);
    if(product) return product;
    else throw { reason: "Not able to find product", statusCode: 500 };
}

async function getAllProductsData() {
  const product = await productRepository.getAllProducts();
  if(product) return product;
  else throw { reason: "Not able to find product", statusCode: 500 };
}


async function deleteProduct(productId) {
  const response = await deleteProductById(productId);
  if(response) return response;
  else throw { reason: "Product Not Found", statusCode: 500 };
}


module.exports = {
  createProduct,
  addProduct,
  deleteProduct,
  getAllProductsData
};
