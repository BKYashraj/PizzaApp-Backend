const { createProduct } = require("../services/productService");

async function addProduct(req, res){
  try {
    const product = await createProduct({
      productName: req.body.productName,
      price: req.body.price,
      description: req.body.description,
      imagePath: req.file.path,
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

module.exports = {
  addProduct
};