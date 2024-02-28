const express = require("express");
const router = express.Router();
const postController = require("../controllers/PostController");
const verifyToken = require("../middlewares/authMiddleware");
// post
router
  .route("/")
  .get(postController.getPosts)
  .post(verifyToken, postController.createPost);
router.put("/edit/:postId",verifyToken,postController.updatePost);
router.post("/search", verifyToken, postController.getFilteredPosts);
router.post("/:id", verifyToken, postController.reportPost);
router.get("/categories", verifyToken, postController.getCategories);
router.get("/:id"
, verifyToken
, postController.getPost);
router.get("/userpost/:author", verifyToken, postController.getCurrentUserPosts);
router.delete("/:id", verifyToken, postController.deletePost);
router.get(
  "/category/:category",
  verifyToken,
  postController.getPostsByCategory
);
router.get(
  "/current/totalposts/:author",
  verifyToken,
  postController.getTotalPosts
);

module.exports = router;
