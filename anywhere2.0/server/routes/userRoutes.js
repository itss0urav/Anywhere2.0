// routes/userRoutes.js

const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const protect = require("../middlewares/authMiddleware");

router.post("/signup", UserController.createUser);
router.post("/login", protect, UserController.loginUser);

module.exports = router;
