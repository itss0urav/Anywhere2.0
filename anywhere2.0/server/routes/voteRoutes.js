const express = require("express");
const router = express.Router({ mergeParams: true });
const VoteController = require("../controllers/VoteController");

router.route("/").post(VoteController.addVote);

module.exports = router;
