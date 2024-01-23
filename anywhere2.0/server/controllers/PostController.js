// controllers/postController.js

const jwt = require("jsonwebtoken");
const Post = require("../models/Post"); // replace with your actual Post model path
const Report = require("../models/Report");
const createPost = async (req, res) => {
  try {
    // const token = req.cookies.token; // access the token from cookies
    // console.log("token from createPost", token);
    // req.user is available here after token verification
    // const username = req.user;

    // create a new post
    const newPost = new Post({
      ...req.body,
    });

    // save the post
    const savedPost = await newPost.save();

    // send the saved post in the response
    res.json(savedPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post. Please try again." });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
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
    // Use a case-insensitive regular expression to find posts containing the specified letters
    const posts = await Post.find({
      name: { $regex: new RegExp(postName, "i") },
    });
    // const posts = await Post.find({ name: postName });
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
  getTotalPosts,
  getCategories,
  getPost,
  getPostsByCategory,
  deletePost,
  reportPost,
  getFilteredPosts,
};
