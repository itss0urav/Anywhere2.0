// Import necessary modules
const express = require("express");
const postController = require("../controllers/PostController");

// Create an Express router
const router = express.Router();

// Define routes
router.post("/post", postController.createPost);
router.get("/", postController.getPosts)

// Export the router
module.exports = router;
