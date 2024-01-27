// models
const Post = require("../models/Post");

exports.addVote = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, voteStatus } = req.body;
    const post = await Post.findById(postId);
    const vote = post.votes.find((vote) => vote.user === userId);
    if (vote) {
      vote.voteStatus = voteStatus;
    } else {
      post.votes.push({ user: userId, voteStatus });
    }
    await post.save();
    res.status(200).json({ message: "Vote updated successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the vote." });
  }
};
