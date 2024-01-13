const mongoose = require("mongoose");
const likeSchema = require("./Like");
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
  likes: {
    type: [likeSchema],
    default: [], // defaults to an empty array
  },
  comments: {
    type: [commentSchema],
    default: [], // defaults to an empty array
  },
});

const Post = mongoose.model("posts", postSchema);

module.exports = Post;
