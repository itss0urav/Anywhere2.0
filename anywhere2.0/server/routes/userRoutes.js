const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const verifyToken = require("../middlewares/authMiddleware");

router.get("/", verifyToken, UserController.getUsers);
router.post("/support", UserController.createSupport);

router.get("/current/:id", verifyToken, UserController.getCurrentUser);
router.get("/other/:username", verifyToken, UserController.getOtherUser);
router.post("/signup", UserController.createUser);
router.post(
  "/login",
  
  UserController.loginUser
);
router.put("/update", verifyToken, UserController.updateUser);
router.post("/verification", verifyToken, UserController.createVerification);

module.exports = router;
