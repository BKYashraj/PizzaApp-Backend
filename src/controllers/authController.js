const { loginUser } = require("../services/authService");

async function logout(req, res) {
  console.log("Cookie", req.cookies);
  
  res.cookie("authToken", "", {
    httpOnly: true,
    secure: true,
    sameSite: 'None', // Helps prevent CSRF attacks
    domain: "pizzayashrajfrontend.netlify.app",
    maxAge:  7 * 24 * 60 * 60 * 1000,
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
    console.log("Response token is ",response.token);
    res.cookie("authToken", response.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      domain: "pizzayashrajfrontend.netlify.app",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  });

    return res.status(200).json({
      success: true,
      message: "Successfully logged in",
      data: {
        userData: response.userData,
        userRole: response.userRole
      },
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
