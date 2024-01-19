const mongoose = require("mongoose");
const supportSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Support = mongoose.models.support || mongoose.model("support", supportSchema);

module.exports = Support;
