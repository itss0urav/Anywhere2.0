const express = require("express");
const router = express.Router();
const CommunityController = require("../controllers/CommunityController");

router.post("/create", CommunityController.createCommunity);
router.get("/get", CommunityController.getCommunities);
router.get("/get/:communityName", CommunityController.getPostsByCommunity);

module.exports = router;
