const mongoose = require("mongoose");

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
});

const Post = mongoose.model("posts", postSchema);

module.exports = Post;
