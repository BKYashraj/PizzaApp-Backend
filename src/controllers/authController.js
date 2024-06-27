const { loginUser } = require("../services/authService");

async function logout(req, res) {
  res.cookie("authToken", "", {
    httpOnly: true,
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    success: true,
    message: "Successfully logged out",
    data: {},
    error: {},
  });
}

async function login(req, res) {
  try {
    const loginPayload = req.body;

    const response = await loginUser(loginPayload);

    // After User login, we send JWT token in the form of cookie to user, so next time when he use any functionality he send this cookie to server then server gives direct access to the user for that functionality.

    res.cookie("authToken", response, {
      httpOnly: true, // Because of httpOnly cookie, it is attached to every request from client to server after login
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Successfully logged in",
      data: {},
      error: {},
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      data: {},
      error: error,
    });
  }
}

module.exports = {
  login,
  logout,
};
