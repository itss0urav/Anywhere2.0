const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");
const verifyToken = require("../middlewares/authMiddleware");
// const protect = require("../middlewares/authMiddleware");

router.post("/signup", AdminController.createAdmin);
router.post(
  "/login",
  // (req, res, next) => protect(req, res, next, handleUnauthorizedError),
  AdminController.adminLogin
);
router.get("/insights", verifyToken, AdminController.getInsights);

router.get("/get", verifyToken, AdminController.getReports);
router.delete("/ignore", verifyToken, AdminController.ignoreReports);
router.delete("/delete", verifyToken, AdminController.deleteReports);

router.get("/support/get", verifyToken, AdminController.getSupports);
router.delete("/support/delete", verifyToken, AdminController.deleteSupports);

router.put("/banunbanuser", verifyToken, AdminController.banUnbanUser);
router.put("/modunmoduser", verifyToken, AdminController.modUnmodUser);

router.get("/verification", verifyToken, AdminController.getVerification);
router.put("/verification", verifyToken, AdminController.toggleVerification);
router.delete("/verification", verifyToken, AdminController.ignoreVerification);

module.exports = router;

// http://localhost:5000/api/posts/reports/get
// http://localhost:5000/api/admin/verification
