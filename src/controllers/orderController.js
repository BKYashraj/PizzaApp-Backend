const { createOrder } = require("../services/orderService");

async function createNewOrder(req, res) {
  try {
    const order = await createOrder(req.user.id, req.body.paymentMethod);
    return res.status(200).json({
      success: true,
      message: "Order created successfully",
      data: order,
      error: {}
    })
  } catch (error) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.reason,
      data: {},
      error: error,
    });
  }
}

module.exports = {
  createNewOrder
}