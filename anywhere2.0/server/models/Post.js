const mongoose = require("mongoose");
const voteSchema = require("./vote");
const commentSchema = require("./Comment");

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  nsfw: {
    type: Boolean,
    default: false,
  },
  author: {
    type: String,
    required: true,
  },
  votes: {
    type: [voteSchema],
    default: [], // defaults to an empty array
  },
  comments: {
    type: [commentSchema],
    default: [], // defaults to an empty array
  },
});

const Post = mongoose.models.posts || mongoose.model("posts", postSchema);

module.exports = Post;
