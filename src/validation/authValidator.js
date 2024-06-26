const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/serverConfig");

// Here we create the middleware to check if user is authenticated or not
async function isLoggedIn(req, res, next) {
  const token = req.cookies["authToken"]; // get the token from cookie

  // if token is not provided, then user is not authenticated
  if (!token) {
    return res.status(401).json({
      success: false,
      data: {},
      error: "Not authenticated",
      message: "No Auth Token provided",
    });
  }

  const decoded = jwt.verify(token, JWT_SECRET); // verify the token with secret key

  if (!decoded) {
    return res.status(401).json({
      success: false,
      data: {},
      error: "Not authenticated",
      message: "Invalid Token provided",
    });
  }

  // if reached here, then user is authenticated allow them to access the api

  req.user = {
    email: decoded.email,
    id: decoded.id,
    role: decoded.role,
  };

  next(); // move to next middleware
}

function isAdmin(req, res, next) {
  const loggedInUser = req.user;
  if (loggedInUser.role == "ADMIN") {
    console.log("User is an admin");

    next();

  } else {
    return res.status(401).json({
      success: false,
      data: {},
      message: "You are not authorised for this action",
      error: {
        statusCode: 401,
        reason: "Unauthorised user for this action",
      },
    });
  }
}

module.exports = {
  isLoggedIn,
  isAdmin,
};
