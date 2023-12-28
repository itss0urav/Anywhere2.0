const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next, handleUnauthorizedError) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select("-password");
      if (!user) {
        return handleUnauthorizedError(res, "NO_USER");
      }
      req.user = user;
      next();
    } else {
      handleUnauthorizedError(res, "NO_TOKEN");
    }
  } catch (err) {
    console.error(err);
    handleUnauthorizedError(res, err);
  }
};

function handleUnauthorizedError(res, err) {
  let message;
  if (err.name === "JsonWebTokenError" && err.message === "jwt malformed") {
    message = "Malformed token";
  } else if (err === "NO_USER") {
    message = "User not found";
  } else if (err === "NO_TOKEN") {
    message = "No token found";
  } else if (err instanceof SyntaxError) {
    message = "Something went wrong. Contact customer care";
  } else if (err instanceof jwt.TokenExpiredError) {
    message = "Token expired";
  } else {
    message = "Unauthorized";
  }
  res.status(401).json({ message });
}

module.exports = protect;
