const express = require("express");
const router = express.Router();
const postController = require("../controllers/PostController");

// const { createPost, getPosts, getCategories, getPost } = require('../controllers/postController');
// router.get("/getpost", postController.getPosts);
// router.post("/create", postController.createPost);
router.route("/").get(postController.getPosts).post(postController.createPost);
router.get("/categories", postController.getCategories);
router.get("/:id", postController.getPost);
module.exports = router;
