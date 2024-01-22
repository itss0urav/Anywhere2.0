// controllers/UserController.js

const User = require("../models/User");
const Support = require("../models/Support");
const Verification = require("../models/Verification");
// const Post = require("../models/Post");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserController = {
  getCurrentUser: async (req, res) => {
    try {
      const userId = req.params.id; // Extract userId from request parameters
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).send(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getOtherUser: async (req, res) => {
    try {
      const username = req.params.username; // Extract userId from request parameters
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).send(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      if (users.length === 0) {
        return res.status(404).json({ message: "No users" });
      }
      res.status(200).send(users);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  createUser: async (req, res) => {
    try {
      const { username, dob, email, password } = req.body;
      const userFromDatabase = await User.findOne({ username });
      if (!userFromDatabase) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
          username,
          dob,
          email,
          password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
      } else {
        res
          .status(400)
          .json({ message: "User already exists with same username!" });
      }
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({
        message: error.message || "Error creating user. Please try again.",
      });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user) {
        return res
          .status(404)
          .json({ message: "Invalid credentials", passed: false });
      }

      // Check if user is banned
      if (user.isBanned) {
        return res
          .status(403)
          .json({ message: "You have been banned, contact admins." });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res
          .status(401)
          .json({ message: "Invalid credentials", passed: false });
      }

      const token = jwt.sign({ user: user.username }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          maxAge: 1000 * 60 * 60 * 2,
        })
        .status(200)
        .json({ message: "Login successful", passed: true, token, user: user });
    } catch (error) {
      console.error("Error during login:", error);
      res
        .status(500)
        .json({ message: "Error during login. Please try again." });
    }
  },

  updateUser: async (req, res) => {
    try {
      const {
        userId,
        username,
        dob,
        email,
        oldPassword,
        newPassword,
        imageUrl,
      } = req.body;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const passwordMatch = await bcrypt.compare(oldPassword, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid old password" });
      }

      const updates = {
        ...(username && { username }),
        ...(dob && { dob }),
        ...(email && { email }),
        ...(imageUrl && { imageUrl }), // Add imageUrl to updates
      };

      if (newPassword && newPassword.trim() !== "" && newPassword.length >= 8) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        updates.password = hashedPassword;
      }

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: updates },
        { new: true }
      );

      res.status(200).json({
        message: "User updated successfully",
        user: updatedUser,
        passed: true,
      });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({
        message: error.message || "Error updating user. Please try again.",
      });
    }
  },
  createVerification: async (req, res) => {
    try {
      const {
        username,
        userId,
        email,
        voterId,
        formType,
        mobileNumber,
        companyName,
        companyRegNumber,
        isVerified,
      } = req.body;
      const newVerification = new Verification({
        username,
        userId,
        email,
        voterId,
        formType,
        mobileNumber,
        companyName,
        companyRegNumber,
        isVerified,
      });
      await newVerification.save();
      res
        .status(201)
        .json({ message: "Verification request created successfully" });
    } catch (error) {
      console.error("Error creating verification request:", error);
      res.status(500).json({
        message:
          error.message ||
          "Error creating verification request. Please try again.",
      });
    }
  },
  createSupport: async (req, res) => {
    try {
      const { username, email, message } = req.body;

      console.log({
        username,
        email,
        message,
      });

      const support = await Support.create({ username, email, message });

      res
        .status(201)
        .json({ message: "Support request created ", support: support });
    } catch (error) {
      console.error("Error creating support:", error);
      res.status(500).json({ error: "Failed to create report " });
    }
  },
};

module.exports = UserController;
