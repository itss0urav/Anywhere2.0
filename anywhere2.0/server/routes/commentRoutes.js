const express = require("express");
const router = express.Router({ mergeParams: true });
const CommentController = require("../controllers/CommentController");

router.route("/").post(CommentController.createComment);

module.exports = router;
