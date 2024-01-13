const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
});

module.exports = likeSchema;
