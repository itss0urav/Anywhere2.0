const User = require("../models/User");
const bcrypt = require("bcrypt");

const UserController = {
  createUser: async (req, res) => {
    try {
      const { username, dob, email, password } = req.body;

      // Perform any necessary validation here

      // Hash the password before saving it to the database
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user in the database
      const newUser = new User({
        username,
        dob,
        email,
        password: hashedPassword,
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
