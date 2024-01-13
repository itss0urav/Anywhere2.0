const mongoose = require("mongoose");
const likeSchema = require("./Like");

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  likes: [likeSchema],
  replies: [this], // This allows for comments on comments
});

module.exports = commentSchema;
