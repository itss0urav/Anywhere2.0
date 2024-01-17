const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
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

  imageUrl: {
    type: String,
    default:
      "https://i.pinimg.com/originals/36/ca/c0/36cac052d0c16bbf663b013495e53b97.jpg",
  },
});

const Admin = mongoose.models.admin || mongoose.model("admin", adminSchema);

module.exports = Admin;
