const express = require("express");
const { getCart, modifyCart, clearproductsFromCart } = require("../services/cartService");

async function getCartByUser(req, res) {
  try {
    const response = await getCart(req.user.id); // we not get anything from body here we get id from isLogged in middleware
    return res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      data: response,
      error: {},
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
      data: {},
      error: error,
    });
  }
}

async function modifyProductToCart(req, res) {
  try {
    const response = await modifyCart(req.user.id, req.params.productId, req.params.operation == 'add'); // we not get anything from body here we get id from isLogged in middleware
    return res.status(200).json({
      success: true,
      message: "Successfully Added Product to the Cart",
      data: response,
      error: {},
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
      data: {},
      error: error,
    });
  }
}

async function clearCartById(req, res) {
  try {
    const response = await clearproductsFromCart(req.user.id);
    return res.status(200).json({
      success: true,
      message: "Successfully cleared all products from the Cart",
      data: response,
      error: {},
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
      data: {},
      error: error,
    });
  }
}

module.exports = {
  getCartByUser,
  modifyProductToCart,
  clearCartById
};
