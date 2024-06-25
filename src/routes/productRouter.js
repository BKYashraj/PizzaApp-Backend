const express = require('express');
const { insertProduct, getProduct, deleteProducts } = require('../controllers/productController');
const uploader = require('../middlewares/multerMiddleware');

const productRouter = express.Router();

productRouter.post('/', uploader.single('productImage'), insertProduct);

productRouter.get('/:id', getProduct);

productRouter.delete('/:id', deleteProducts);

module.exports = productRouter;

