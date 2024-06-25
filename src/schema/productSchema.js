const moongose = require('moongose');

const productSchema = new moongose.Schema({
  Productname: {
    type: String,
    required: [true, "Product Name is required"],
    minlength: [5, "Product Name must be atleast 5 character long"],
    lowercase: true,
    trim: true, // if the user gives extra spaces then it will automatically remove it
  },
  price: {
    type: Number,
    required: [true, "Price is required"]
  },
  description: {
    type: String,
    minlength: [5, "Product Name must be atleast 5 character long"],
    required: [true, "Description is required"]
  },
  productImage:{
    type: String,
    required: [true, "Product Image is required"]
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
  }
},{
  timestamps: true
});

const Product = moongose.model("Product", productSchema); // collection

module.exports = Product;
