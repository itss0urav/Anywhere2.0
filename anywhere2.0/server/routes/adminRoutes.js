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
router.get("/get", AdminController.getReports);
router.delete("/ignore", AdminController.ignoreReports);
router.delete("/delete", AdminController.deleteReports);

router.put("/banunbanuser", AdminController.banUnbanUser);
router.put("/modunmoduser", AdminController.modUnmodUser);

module.exports = router;

// http://localhost:5000/api/posts/reports/get
