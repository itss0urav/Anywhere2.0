const express = require("express");
const router = express.Router();
const postController = require("../controllers/PostController");
// const protect = require("../middlewares/authMiddleware");
// const { createPost, getPosts, getCategories, getPost } = require('../controllers/postController');
// router.get("/getpost", postController.getPosts);
// router.post("/create", postController.createPost);
router.route("/").get(postController.getPosts).post(
  // protect,
  postController.createPost
);
router.get("/categories", postController.getCategories);
router.get("/:id", postController.getPost);
router.get("/category/:category", postController.getPostsByCategory);

module.exports = router;
