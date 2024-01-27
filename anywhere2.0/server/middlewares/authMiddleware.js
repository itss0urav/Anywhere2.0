// const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    // console.log("Token to verify:", token);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.log("Error verifying token:", err);
        return res
          .status(403)
          .json({ message: "Token is not valid. Please log in again." });
      }
      req.user = user;
      // console.log("Token Verified");
      next();
    });
  } else {
    console.log("No authorization header found in request.");
    res.status(401).json({ message: "Authentication token must be provided." });
  }
};

module.exports = verifyToken;
