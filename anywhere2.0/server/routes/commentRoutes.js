const express = require("express");
const router = express.Router({ mergeParams: true });
const CommentController = require("../controllers/CommentController");
const verifyToken = require("../middlewares/authMiddleware");
// comment
router
  .route("/")
  .post(verifyToken, CommentController.createComment)
  .get(verifyToken, CommentController.getComments)
  .delete(verifyToken, CommentController.deleteComment);
  // comment vote
router
  .route("/:commentId/votes")
  .post(verifyToken, CommentController.addVoteToComment);

module.exports = router;
