const express = require("express");
const {
  insertProduct,
  getProduct,
  deleteProducts,
} = require("../controllers/productController");
const uploader = require("../middlewares/multerMiddleware");
const { isLoggedIn, isAdmin } = require("../validation/authValidator");

const productRouter = express.Router();

productRouter.post(
  "/",
  isLoggedIn, // Middleware Called
  isAdmin,  // Middleware Called
  uploader.single("productImage"),
  insertProduct
);

productRouter.get("/:id", getProduct);

productRouter.delete("/:id", deleteProducts);

module.exports = productRouter;
