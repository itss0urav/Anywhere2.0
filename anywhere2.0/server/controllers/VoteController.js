const Post = require("../models/Post");

exports.addVote = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, voteStatus } = req.body; // get userId and voteStatus from the request body

    // Find the post
    const post = await Post.findById(postId);

    // Find the vote of this user
    const vote = post.votes.find((vote) => vote.user === userId);

    if (vote) {
      // If the user has already voted, update the voteStatus
      vote.voteStatus = voteStatus;
    } else {
      // If the user hasn't voted yet, add their vote
      post.votes.push({ user: userId, voteStatus });
    }

    // Save the post
    await post.save();

    res.status(200).json({ message: "Vote updated successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the vote." });
  }
};
