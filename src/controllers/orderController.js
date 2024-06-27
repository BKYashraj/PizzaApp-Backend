const { createOrder, getAllOrdersCreatedByUsers, getOrderDetailById, updateOrder } = require("../services/orderService");

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

async function getAllOrdersByUser(req, res) {
  try {
    const order = await getAllOrdersCreatedByUsers(req.user.id);
    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
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

async function getOrderById(req, res) {
  try {
    const order = await getOrderDetailById(req.params.orderId);
    return res.status(200).json({
      success: true,
      message: "Order fetched successfully",
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

async function cancelOrderById(req, res) {
  try {
    const order = await updateOrder(req.params.orderId, "CANCELLED");
    return res.status(200).json({
      success: true,
      message: "Order Updated successfully",
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

async function changeOrderStatus(req, res) {
  try {
    const order = await updateOrder(req.params.orderId, req.body.status);
    return res.status(200).json({
      success: true,
      message: "Order Updated successfully",
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
  createNewOrder,
  getAllOrdersByUser,
  getOrderById,
  cancelOrderById,
  changeOrderStatus
}