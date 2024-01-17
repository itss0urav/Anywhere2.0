const mongoose = require("mongoose");
const reportSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

const Report =
  mongoose.models.reports || mongoose.model("reports", reportSchema);

module.exports = Report;
