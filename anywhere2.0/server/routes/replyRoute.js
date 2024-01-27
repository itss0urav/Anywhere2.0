const express = require("express");
const router = express.Router({ mergeParams: true });
const CommentController = require("../controllers/CommentController");
const verifyToken = require("../middlewares/authMiddleware");
// reply
router.route("/").post(verifyToken,CommentController.addReply);
router.route("/:text").delete(verifyToken, CommentController.deleteReply);

module.exports = router;