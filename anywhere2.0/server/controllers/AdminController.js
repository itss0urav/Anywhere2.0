// controllers/AdminController.js

const Admin = require("../models/Admin");
const User = require("../models/User");
const Report = require("../models/Report");
const Post = require("../models/Post");
const Verification = require("../models/Verification");
const Support = require("../models/Support");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const generateAccessToken = require("../utils/generateToken");user

const AdminController = {
  createAdmin: async (req, res) => {
    try {
      const { username, email, password, imageUrl } = req.body;
      const adminFromDatabase = await Admin.findOne({ username });
      if (!adminFromDatabase) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newAdmin = new Admin({
          username,

          email,
          password: hashedPassword,
          imageUrl,
        });
        await newAdmin.save();
        res.status(201).json({ message: "Admin created successfully" });
      } else {
        res
          .status(400)
          .json({ message: "Admin already exists with same username!" });
      }
    } catch (error) {
      console.error("Error creating Admin:", error);
      res.status(500).json({
        message: error.message || "Error creating Admin. Please try again.",
      });
    }
  },
  adminLogin: async (req, res) => {
    try {
      const { username, password } = req.body;
      const admin = await Admin.findOne({ username });

      if (!admin) {
        return res
          .status(404)
          .json({ message: "Invalid credentials", passed: false });
      }

      const passwordMatch = await bcrypt.compare(password, admin.password);
      console.log(passwordMatch);
      if (!passwordMatch) {
        return res
          .status(401)
          .json({ message: "Invalid credentials", passed: false });
      }

      // const accessToken = generateAccessToken(user._id);
      const token = jwt.sign({ user: admin.username }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          maxAge: 1000 * 60 * 60,
        })
        .status(200)
        .json({
          message: "Login successful",
          passed: true,
          token,
          admin: admin,
        });
    } catch (error) {
      console.error("Error during login:", error);
      res
        .status(500)
        .json({ message: "Error during login. Please try again." });
    }
  },

  getInsights: async (req, res) => {
    try {
      const totalAdmins = await Admin.find();
      const totalPosts = await Post.find();
      const totalReports = await Report.find();
      const totalSupport = await Support.find();
      const totalUsers = await User.find();
      const totalMods = await User.countDocuments({ isMod: true });
      const totalVerificationRequests = await Verification.find();
      const totalVerifiedUsers = await User.countDocuments({ isVerified: true });

      console.log(
        "insight data from server:",
        totalAdmins.length,
        totalPosts.length,
        totalReports.length,
        totalSupport.length,
        totalUsers.length,
        totalVerificationRequests.length,
        totalVerifiedUsers,
        totalMods
      );
      res.status(200).json({
        totalAdmins: totalAdmins.length,
        totalPosts: totalPosts.length,
        totalReports: totalReports.length,
        totalSupport: totalSupport.length,
        totalUsers: totalUsers.length,
        totalVerificationRequests: totalVerificationRequests.length,
        totalVerifiedUsers,
        totalMods,
      });
    } catch (error) {
      res.status(404).json({ message: "Resources not found!" });
      console.log(error);
    }
  },
  banUnbanUser: async (req, res) => {
    try {
      const { userId } = req.body;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: { isBanned: !user.isBanned } },
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

  modUnmodUser: async (req, res) => {
    try {
      const { userId } = req.body;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: { isMod: !user.isMod } },
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

  getReports: async (req, res) => {
    try {
      console.log("Fetching reports...");
      const Reports = await Report.find();
      console.log("Reports fetched successfully:", Reports);
      res.status(200).send(Reports);
    } catch (error) {
      console.log("Error occurred while fetching reports:", error);
    }
  },
  deleteReports: async (req, res) => {
    try {
      console.log("Fetching report...");
      const { postId } = req.body;
      console.log(postId);
      const Reports = await Post.findByIdAndDelete(postId);
      console.log("Report deleted successfully:", Reports);
      res.status(200).send(Reports);
    } catch (error) {
      console.log("Error occurred while deleting reports:", error);
    }
  },
  ignoreReports: async (req, res) => {
    try {
      console.log("Fetching report...");
      const { reportId } = req.body;
      const Reports = await Report.findByIdAndDelete(reportId);
      console.log("Report deleted successfully:", Reports);
      res.status(200).send(Reports);
    } catch (error) {
      console.log("Error occurred while deleting reports:", error);
    }
  },
  getVerification: async (req, res) => {
    try {
      const requests = await Verification.find({});
      res.status(200).send(requests);
    } catch (error) {
      console.error("Error finding verification request:", error);
      res.status(500).json({
        message:
          error.message ||
          "Error finding verification request. Please try again.",
      });
    }
  },
  ignoreVerification: async (req, res) => {
    try {
      const { reqId } = req.body;

      // Check if reqId is defined before attempting to delete
      if (!reqId) {
        return res
          .status(400)
          .json({ message: "Invalid request. reqId is undefined." });
      }

      const requests = await Verification.findByIdAndDelete(reqId);
      res.status(200).send(requests);
    } catch (error) {
      console.error("Error finding verification request:", error);
      res.status(500).json({
        message:
          error.message ||
          "Error finding verification request. Please try again.",
      });
    }
  },

  toggleVerification: async (req, res) => {
    try {
      const { userId, reqId } = req.body;

      console.log("userId:", userId);
      console.log("reqId:", reqId);

      const user = await User.findOne({ _id: userId });
      console.log("user:", user);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: { isVerified: !user.isVerified } },
        { new: true }
      );
      console.log("updatedUser:", updatedUser);

      const requestFromDB = await Verification.findOne({ _id: reqId });
      console.log("requestFromDB:", requestFromDB);

      if (!requestFromDB) {
        return res.status(404).json({ message: "Request not found" });
      }

      const toggledRequest = await Verification.findByIdAndUpdate(
        reqId,
        { $set: { isVerified: !requestFromDB.isVerified } },
        { new: true }
      );
      console.log("toggledRequest:", toggledRequest);

      res.status(200).json({
        message: "User and verification request updated successfully",
        user: updatedUser,
        verificationRequests: toggledRequest,
        passed: true,
      });
    } catch (error) {
      console.error("Error finding verifying user :", error);
      res.status(500).json({
        message:
          error.message ||
          "Error finding verification request. Please try again.",
      });
    }
  },
  getSupports: async (req, res) => {
    try {
      console.log("Fetching Support every 2 sec on focus...");
      const Supports = await Support.find();

      res.status(200).send(Supports);
    } catch (error) {
      console.log("Error occurred while fetching Support:", error);
    }
  },
  deleteSupports: async (req, res) => {
    try {
      console.log("Fetching report...");
      const { supportId } = req.body;
      console.log(supportId);
      const Supports = await Support.findByIdAndDelete(supportId);
      console.log("Support deleted successfully:", Supports);
      res.status(200).send(Supports);
    } catch (error) {
      console.log("Error occurred while deleting support:", error);
    }
  },
};

module.exports = AdminController;
