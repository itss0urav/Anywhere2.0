const express = require("express");
const router = express.Router({ mergeParams: true });
const LikeController = require("../controllers/likeController");

router.route("/").post(LikeController.addLike);

module.exports = router;
