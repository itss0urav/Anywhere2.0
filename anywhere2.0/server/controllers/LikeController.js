const Post = require("../models/Post");

exports.addLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const comment = post.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    const like = {
      user: req.body.user,
    };
    comment.likes.push(like);
    await post.save();
    res.status(201).json({ message: "Like added successfully", post: post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
