// controllers/AdminController.js

const Admin = require("../models/Admin");
const User = require("../models/User");
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
      const token = jwt.sign(
        { admin: admin.username },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

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
};

module.exports = AdminController;
