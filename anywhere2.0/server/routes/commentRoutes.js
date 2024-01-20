const express = require("express");
const router = express.Router({ mergeParams: true });
const CommentController = require("../controllers/CommentController");

router
  .route("/")
  .post(CommentController.createComment)
  .get(CommentController.getComments)
  .delete(CommentController.deleteComment);
router.route("/:commentId/votes").post(CommentController.addVoteToComment);

module.exports = router;
