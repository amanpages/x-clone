const User = require("../models/User");
const jwt = require("jsonwebtoken");

// to check whether user is loggedin or not
exports.isLoggedIn = async (req, res, next) => {
  try {
    if (!req.header) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    // getting the value of token from cookies / header
    const token = await req.header("Authorization").replace("Bearer ", "");

    if (!token || token === "null") {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    // if token found
    // decode it to get the values stored inside the token
    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decode.id);

    next();
  } catch (err) {
    if (
      err instanceof jwt.TokenExpiredError ||
      err instanceof jwt.JsonWebTokenError
    ) {
      return res.status(401).json({
        error: "Token expired, Please SignIn again",
      });
    }
    return res.status(400).json({
      error: err.message,
    });
  }
};
