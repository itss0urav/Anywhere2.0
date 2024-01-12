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
        res.status(400).json({ message: "User already exists with same username!" });
      }
    } catch (error) {
      console.error("Error creating user:", error);
      res
        .status(500)
        .json({ message: error.message || "Error creating user. Please try again." });
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
};

module.exports = UserController;
