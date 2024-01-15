const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  voteStatus: {
    type: Number,
    default: 0, // 1 for upvoted, -1 for downvoted, 0 for no vote
  },
});

module.exports = voteSchema;
