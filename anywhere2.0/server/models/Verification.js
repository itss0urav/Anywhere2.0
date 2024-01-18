const mongoose = require("mongoose");

const VerificationSchema = new mongoose.Schema({
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
});

const Verification =
  mongoose.models.verification ||
  mongoose.model("verification", VerificationSchema);

module.exports = Verification;
