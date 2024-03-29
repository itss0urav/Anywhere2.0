const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// models
const User = require("../models/User");
const Post = require("../models/Post");
const Admin = require("../models/Admin");
const Report = require("../models/Report");
const Support = require("../models/Support");
const Verification = require("../models/Verification");

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
      const token = jwt.sign({ user: admin.username }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res
        // .cookie("token", token, {
        //   httpOnly: true,
        //   secure: true,
        //   maxAge: 1000 * 60 * 60,
        // })
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
      const totalAdmins = await Admin.countDocuments();
      const totalPosts = await Post.countDocuments();
      const totalReports = await Report.countDocuments();
      const totalSupport = await Support.countDocuments();
      const totalUsers = await User.countDocuments();
      const totalActiveUsers = await User.countDocuments({ isBanned: false });
      const totalBannedUsers = await User.countDocuments({ isBanned: true });
      const totalMods = await User.countDocuments({ isMod: true });
      const totalVerificationRequests = await Verification.countDocuments();
      const totalVerifiedUsers = await User.countDocuments({
        isVerified: true,
      });
      // console.log(
      //   "insight data from server:",
      //   totalUsers,
      //   totalActiveUsers,
      //   totalBannedUsers,
      //   totalAdmins,
      //   totalMods,
      //   totalPosts,
      //   totalReports,
      //   totalSupport,
      //   totalVerifiedUsers,
      //   totalVerificationRequests
      // );
      console.log("Fetching insights every 2 sec on focus");
      res.status(200).json({
        totalUsers,
        totalActiveUsers,
        totalBannedUsers,
        totalAdmins,
        totalMods,
        totalPosts,
        totalReports,
        totalSupport,
        totalVerifiedUsers,
        totalVerificationRequests,
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
      console.log("Fetching reports every 2 sec on focus...");
      const Reports = await Report.find();
      // console.log("Reports fetched successfully:", Reports);
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
      console.log("Fetching verification requests every 2 sec on focus");
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
