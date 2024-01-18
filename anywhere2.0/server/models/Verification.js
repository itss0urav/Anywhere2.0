const mongoose = require("mongoose");

const VerificationSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  voterId: {
    type: String,
    required: true,
  },
  formType: {
    type: String,
    enum: ["individual", "company"],
    default: "individual",
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
  },
  companyRegNumber: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    required: true,
  },
});

const Verification =
  mongoose.models.verification ||
  mongoose.model("verification", VerificationSchema);

module.exports = Verification;
