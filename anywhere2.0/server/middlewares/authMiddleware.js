const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // access the token from cookies
  console.log("token from middleware", token);
  if (!token) {
    return res.status(403).json({ error: "No token provided." });
  }

  // verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Failed to authenticate token." });
    } else {
      // if token is verified, add the decoded user to the request
      req.user = decoded.user;
      next();
    }
  });
};

module.exports = verifyToken;
