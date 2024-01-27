const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");
const AdminController = require("../controllers/AdminController");

// auth
router.post("/signup", AdminController.createAdmin);
router.post("/login", AdminController.adminLogin);
// insight
router.get("/insights", verifyToken, AdminController.getInsights);
// report
router.get("/get", verifyToken, AdminController.getReports);
router.delete("/ignore", verifyToken, AdminController.ignoreReports);
router.delete("/delete", verifyToken, AdminController.deleteReports);
// support/report
router.get("/support/get", verifyToken, AdminController.getSupports);
router.delete("/support/delete", verifyToken, AdminController.deleteSupports);
// ban&unban
router.put("/banunbanuser", verifyToken, AdminController.banUnbanUser);
router.put("/modunmoduser", verifyToken, AdminController.modUnmodUser);
// verification
router.get("/verification", verifyToken, AdminController.getVerification);
router.put("/verification", verifyToken, AdminController.toggleVerification);
router.delete("/verification", verifyToken, AdminController.ignoreVerification);

module.exports = router;

// http://localhost:5000/api/posts/reports/get
// http://localhost:5000/api/admin/verification
