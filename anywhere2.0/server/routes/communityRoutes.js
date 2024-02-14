const express = require("express");
const router = express.Router();
const CommunityController = require("../controllers/CommunityController");

router.post("/create", CommunityController.createCommunity);

module.exports = router;
