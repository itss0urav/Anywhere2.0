// utils/generateToken.js

const jwt = require("jsonwebtoken");

function generateAccessToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
}

module.exports = generateAccessToken;
