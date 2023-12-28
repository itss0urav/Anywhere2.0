const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const protect = require("../middlewares/authMiddleware");

router.post("/signup", UserController.createUser);
router.post(
  "/login",
  (req, res, next) => protect(req, res, next, handleUnauthorizedError),
  UserController.loginUser
);

module.exports = router;
