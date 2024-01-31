const jwt = require("jsonwebtoken");
// models
const Post = require("../models/Post");
const Report = require("../models/Report");

const createPost = async (req, res) => {
  try {
    const newPost = new Post({
      ...req.body,
    });
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post. Please try again." });
  }
};

const getPosts = async (req, res) => {
  try {
    console.log("Fetching posts every 2 sec on focus...")
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

const updatePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { name, category, description, imageUrl, nsfw } = req.body;
    console.log("Updating post with ID:", postId);
    const post = await Post.findById(postId);
    if (!post) {
      console.log("Post not found");
      return res.status(404).json({ message: "Post not found" });
    }
    console.log("Found post:", post);
    const updates = {
      ...(name && { name }),
      ...(category && { category }),
      ...(description && { description }),
      ...(imageUrl && { imageUrl }),
      ...(nsfw && { nsfw }),
    };
    console.log("Applying updates:", updates);
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $set: updates },
      { new: true }
    );
    console.log("Updated post:", updatedPost);
    res.status(200).json({
      message: "Post updated successfully",
      user: updatedPost,
      passed: true,
    });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: error.message || "Failed to update post" });
  }
};

const getTotalPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.author });
    res.json(posts.length);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

const getFilteredPosts = async (req, res) => {
  try {
    const { postName } = req.body;
    const posts = await Post.find({
      name: { $regex: new RegExp(postName, "i") },
    });
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Post.distinct("category");
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Failed to fetch post" });
  }
};

const getPostsByCategory = async (req, res) => {
  try {
    const posts = await Post.find({ category: req.params.category });
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    res.status(500).json({ error: "Failed to fetch posts by category" });
  }
};

const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Posted Deleted" });
    console.log(`Post with id:${req.params.id} has been deleted`);
  } catch {
    (err) => console.log(err);
  }
};

const reportPost = async (req, res) => {
  try {
    const { postId, reason, username } = req.body;
    console.log({
      reason,
      username,
      postId,
    });
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const Reports = await Report.create({ postId, reason, username });
    res.json({ message: "Report created ", Reports: Reports });
  } catch (error) {
    console.error("Error reporting post:", error);
    res.status(500).json({ error: "Failed to create report " });
  }
};

module.exports = {
  createPost,
  getPosts,
  updatePost,
  getTotalPosts,
  getCategories,
  getPost,
  getPostsByCategory,
  deletePost,
  reportPost,
  getFilteredPosts,
};
