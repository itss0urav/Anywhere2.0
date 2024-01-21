const express = require("express");
const router = express.Router({ mergeParams: true });
const VoteController = require("../controllers/VoteController");

router.route("/:postId/votes").post(VoteController.addVote);

module.exports = router;
