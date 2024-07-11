const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Product Name is required"],
    minlength: [5, "Product Name must be atleast 5 character long"],
    trim: true, // if the user gives extra spaces then it will automatically remove it
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    default: 10
  },
  originalPrice: {
    type: Number,
    required: [true, "Price is required"]
  },
  discountedPrice: {
    type: Number,
    required: [true, "Discounted Price is required"]
  },
  description: {
    type: String,
    minlength: [5, "Product Name must be atleast 5 character long"],
  },
  productImage:{
    type: String,
  },
  category: {
    type: String,
    enum:["Veg","Non-Veg","Drinks","sides"],
    default: "Veg",
    required: [true, "Category is required"]
  },
  instock:{
    type: Boolean,
    default: true,
    required: [true, "In Stock status is required"]
  },
  discount:{
    type: Number,
  },
},{
  timestamps: true
});

const Product = mongoose.model("Product", productSchema); // collection

module.exports = Product;
