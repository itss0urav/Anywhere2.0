const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");
// const protect = require("../middlewares/authMiddleware");

router.post("/signup", AdminController.createAdmin);
router.post(
  "/login",
  // (req, res, next) => protect(req, res, next, handleUnauthorizedError),
  AdminController.adminLogin
);
module.exports = router;
