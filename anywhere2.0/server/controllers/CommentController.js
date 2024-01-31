// models
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

exports.deleteComment = async (req, res) => {
  try {
    console.log(
      "Deleting comment...",
      "PostId:",
      req.params.id,
      "CommentId",
      req.params.commentId
    );
    const post = await Post.findById(req.params.id);
    if (!post) {
      console.log("Post not found");
      return res.status(404).json({ message: "Post not found" });
    }
    const comment = post.comments.id(req.params.commentId);
    if (!comment) {
      console.log("Comment not found");
      return res.status(404).json({ message: "Comment not found" });
    }
    post.comments.pull(req.params.commentId); 
    console.log("Comment removed");
    await post.save();
    console.log("Post saved");
    res.status(201).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ error: error.message });
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

exports.deleteReply = async (req, res) => {
  console.log("Deleting reply...");
  const post = await Post.findById(req.params.postId);
  if (!post) {
    console.log("Post not found");
    return res.status(404).json({ message: "Post not found" });
  }
  const comment = post.comments.id(req.params.commentId);
  if (!comment) {
    console.log("Comment not found");
    return res.status(404).json({ message: "Comment not found" });
  }
  const initialRepliesLength = comment.replies.length;
  comment.replies = comment.replies.filter(
    (reply) => reply.text !== req.params.text
  );
  const finalRepliesLength = comment.replies.length;
  if (initialRepliesLength === finalRepliesLength) {
    console.log("Reply not found");
    return res.status(404).json({ message: "Reply not found" });
  }
  await post.save();
  console.log("Reply deleted successfully");
  res.status(200).json({ message: "Reply deleted successfully" });
};

exports.addVoteToComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId, voteStatus, postId } = req.body;
    console.log("Received postId:", postId);
    console.log("Received commentId:", commentId);
    console.log("Received userId:", userId);
    console.log("Received voteStatus:", voteStatus);
    const post = await Post.findById(postId);
    if (!post) {
      console.log("Post not found");
      return res.status(404).json({ message: "Post not found." });
    }
    const comment = post.comments.id(commentId);
    if (!comment) {
      console.log("Comment not found");
      return res.status(404).json({ message: "Comment not found." });
    }
    const vote = comment.votes.find((v) => v.user === userId);
    if (vote) {
      vote.voteStatus = voteStatus;
    } else {
      comment.votes.push({ user: userId, voteStatus });
    }
    await post.save();
    console.log("Vote updated successfully");
    res.status(200).json({
      message: "Vote updated successfully.",
      voteCount: comment.votes.length,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the vote." });
  }
};
