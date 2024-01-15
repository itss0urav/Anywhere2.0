const express = require("express");
const router = express.Router({ mergeParams: true });
const CommentController = require("../controllers/CommentController");

router
  .route("/")
  .post(CommentController.createComment)
  .get(CommentController.getComments);
router.route("/:commentId/votes").post(CommentController.addVoteToComment);

module.exports = router;
