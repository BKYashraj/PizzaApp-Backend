const { createProduct, addProduct, deleteProduct } = require("../services/productService");

async function insertProduct(req, res){
  try {
    const product = await createProduct({
      productName: req.body.productName,
      price: req.body.price,
      description: req.body.description,
      imagePath: req.file?.path,  // ? is added because if file present then it works but if file means image not present it does not show error it works without image
      category: req.body.category,
      instock: req.body.instock
    });
    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
      error: {}
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      success: false,
      message: error.reason,
      data: {},
      error: error
    });
  } 
}

async function getProduct(req, res) {
  try {
    const response = await addProduct(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: response,
      error: {}
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      success: false,
      message: error.reason,
      data: {},
      error: error
    });
  }
}

async function deleteProducts(req, res) {
  try {
    const response = await deleteProduct(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: response,
      error: {}
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      success: false,
      message: error.reason,
      data: {},
      error: error
    });
  }
}

module.exports = {
  insertProduct,
  getProduct,
  deleteProducts
};