// middleware/authMiddleware.js

const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
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
      return;
    }
    handleUnauthorizedError(res, "NO_TOKEN");
  } catch (error) {
    console.log(error);
    handleUnauthorizedError(res, error);
  }
};

function handleUnauthorizedError(res, err) {
  let message;
  if (err === "NO_USER") {
    message = "User not found";
  }
  if (err === "NO_TOKEN") {
    message = "No token found";
  }
  if (err instanceof SyntaxError) {
    message = "Something went wrong. Contact customer care";
  }
  if (error instanceof jwt.TokenExpiredError) {
    message = "Token expired";
  }
  res.status(401).json({ message });
}

module.exports = protect;
