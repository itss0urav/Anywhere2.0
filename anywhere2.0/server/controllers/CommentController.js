const Post = require("../models/Post");

exports.createComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const comment = {
      text: req.body.text,
      user: req.body.user,
    };
    post.comments.push(comment);
    await post.save();
    res.status(201).json({ message: "Comment added successfully", post: post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getComments = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ comments: post.comments });
  } catch (error) {
    console.log("Failed to get Comments", error);
  }
};
exports.addReply = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const comment = post.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    const reply = {
      text: req.body.text,
      user: req.body.user,
    };
    comment.replies.push(reply);
    await post.save();
    res.status(201).json({ message: "Reply added successfully", post: post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
