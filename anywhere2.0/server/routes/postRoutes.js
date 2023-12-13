const express = require("express");
const router = express.Router();
const postController = require("../controllers/PostController");

// Post routes
// router.get("/getpost", postController.getPosts);
// router.post("/create", postController.createPost);
router.route("/").get(postController.getPosts).post(postController.createPost);

module.exports = router;
