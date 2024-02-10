// routes.js
const express = require("express");
const { getLogs } = require("../middlewares/logMiddleware");

const router = express.Router();

router.get("/api/logs", getLogs);

module.exports = router;
