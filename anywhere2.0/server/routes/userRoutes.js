const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
// const protect = require("../middlewares/authMiddleware");
router.get("/",UserController.getUsers)
router.post("/support", UserController.createSupport);


router.get("/current/:id",UserController.getCurrentUser)
router.post("/signup", UserController.createUser);
router.post(
  "/login",
  // (req, res, next) => protect(req, res, next, handleUnauthorizedError),
  UserController.loginUser
);
router.put("/update", UserController.updateUser);
router.post('/verification', UserController.createVerification);

module.exports = router;
