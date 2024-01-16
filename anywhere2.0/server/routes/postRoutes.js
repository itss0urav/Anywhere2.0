// routes/postRoutes.js

const express = require("express");
const router = express.Router();
const postController = require("../controllers/PostController");
// const verifyToken = require("../middlewares/authMiddleware");

router.route("/").get(postController.getPosts).post(
  // verifyToken,
  postController.createPost
);

router.get("/categories", postController.getCategories);
router.get("/:id", postController.getPost);
router.delete("/:id", postController.deletePost);
router.get("/category/:category", postController.getPostsByCategory);

module.exports = router;
