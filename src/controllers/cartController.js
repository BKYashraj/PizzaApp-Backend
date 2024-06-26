const express = require('express');
const { getCart } = require('../services/cartService');

async function getCartByUser(req, res) {
  try {
    const response = await getCart(req.user.id); // we not get anything from body here we get id from isLogged in middleware
    return res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      data: response,
      error: {}
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
      data: {},
      error: error
    });
  }
 
}

module.exports ={
  getCartByUser
}