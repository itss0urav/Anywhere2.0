const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isMod: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },

    imageUrl: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
