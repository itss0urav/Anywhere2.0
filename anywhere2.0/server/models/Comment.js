const mongoose = require("mongoose");
const voteSchema = require("./vote");

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  votes: [voteSchema],
  replies: [this],
});

module.exports = commentSchema;
