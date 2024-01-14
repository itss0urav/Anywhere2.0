// controllers/UserController.js

const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const generateAccessToken = require("../utils/generateToken");

const UserController = {
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

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res
          .status(401)
          .json({ message: "Invalid credentials", passed: false });
      }

      // const accessToken = generateAccessToken(user._id);
      const token = jwt.sign({ user: user.username }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          maxAge: 1000 * 60 * 60,
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
      const { userId, username, dob, email, oldPassword, newPassword } =
        req.body;
      const user = await User.findById(userId); // Use the user ID from the request

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const passwordMatch = await bcrypt.compare(oldPassword, user.password);
      if (!passwordMatch) {
        return res
          .status(401)
          .json({
            message: "Invalid old password ,Must fill Old Password Field",
          });
      }

      const updates = {
        ...(username && { username }),
        ...(dob && { dob }),
        ...(email && { email }),
      };

      if (newPassword && newPassword.trim() !== "") {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        updates.password = hashedPassword;
      }

      const updatedUser = await User.findByIdAndUpdate(
        userId, // Use the user ID from the request
        { $set: updates },
        { new: true }
      );

      res.status(200).json({
        message: "User updated successfully",
        user: updatedUser,
        passed: true,
      }); // Include 'passed' in the response
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({
        message: error.message || "Error updating user. Please try again.",
      });
    }
  },
};

module.exports = UserController;
