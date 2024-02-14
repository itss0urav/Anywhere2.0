const mongoose = require("mongoose");
const voteSchema = require("./vote");
const commentSchema = require("./Comment");

const postSchema = new mongoose.Schema(
  {
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
      default:
        "https://www.ejiltalk.org/wp-content/uploads/2021/03/pexels-photo-110854.jpeg",
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
      default: [],
    },
    comments: {
      type: [commentSchema],
      default: [],
    },
    community: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Post = mongoose.models.posts || mongoose.model("posts", postSchema);

module.exports = Post;
