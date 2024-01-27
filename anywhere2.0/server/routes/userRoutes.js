const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const verifyToken = require("../middlewares/authMiddleware");
// auth
router.post("/signup", UserController.createUser);
router.post("/login", UserController.loginUser);
// user
router.get("/", verifyToken, UserController.getUsers);
router.get("/current/:id", verifyToken, UserController.getCurrentUser);
router.get("/other/:username", verifyToken, UserController.getOtherUser);
router.put("/update", verifyToken, UserController.updateUser);
// support
router.post("/support", UserController.createSupport);
// verification
router.post("/verification", verifyToken, UserController.createVerification);

module.exports = router;
