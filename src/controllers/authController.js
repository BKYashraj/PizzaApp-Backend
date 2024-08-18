const { loginUser } = require("../services/authService");

async function logout(req, res) {
  console.log("Cookie", req.cookies);
  console.log("logout");
  
  res.cookie("authToken", "", {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000, // Setting maxAge but for an empty cookie
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

    // Send JWT token in the form of a cookie
    console.log("Response token is ", response.token);
    res.cookie("authToken", response.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
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
    return res.status(error.statusCode || 500).json({
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
