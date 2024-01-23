// routes/postRoutes.js

const express = require("express");
const router = express.Router();
const postController = require("../controllers/PostController");
const verifyToken = require("../middlewares/authMiddleware");

router.route("/").get(postController.getPosts).post(
  verifyToken,
  postController.createPost
);
router.post("/search",verifyToken, postController.getFilteredPosts);
router.post("/:id",verifyToken, postController.reportPost);

router.get("/categories",verifyToken, postController.getCategories);
router.get("/:id",verifyToken, postController.getPost);
router.delete("/:id",verifyToken, postController.deletePost);
router.get("/category/:category",verifyToken, postController.getPostsByCategory);
router.get("/current/totalposts/:author", verifyToken, postController.getTotalPosts);


module.exports = router;
