const express = require("express");
const router = express.Router({ mergeParams: true });
const CommentController = require("../controllers/CommentController");
const verifyToken = require("../middlewares/authMiddleware");

router.route("/").post(verifyToken,CommentController.addReply);
module.exports = router;