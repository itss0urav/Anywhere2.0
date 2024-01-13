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
    res.status(201).json({ message: "Comment added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
