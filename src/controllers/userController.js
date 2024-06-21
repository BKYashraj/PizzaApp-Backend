const { Model } = require("mongoose");
const UserService = require("../services/userService");
const UserRepository = require("../repositories/userRepository");

async function createUser(req, res) {

  const userService = new UserService(new UserRepository());

  try {
    const response = await userService.registerUser(req.body);
    return res.json({
      message: "Successfully registered the user",
      success: true,
      data: response,
      error: {},
    });
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
  createUser,
};
