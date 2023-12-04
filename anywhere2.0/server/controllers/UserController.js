const User = require("../models/User");

const UserController = {
  createUser: async (req, res) => {
    try {
      const { username, dob, email, password } = req.body;

      // Perform any necessary validation here

      // Create a new user in the database
      const newUser = new User({
        username,
        dob,
        email,
        password,
      });

      await newUser.save();

      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = UserController;
