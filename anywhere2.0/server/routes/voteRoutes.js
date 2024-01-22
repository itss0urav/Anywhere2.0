const express = require("express");
const router = express.Router({ mergeParams: true });
const VoteController = require("../controllers/VoteController");
const verifyToken = require("../middlewares/authMiddleware");

router.route("/:postId/votes").post(verifyToken,VoteController.addVote);

module.exports = router;
