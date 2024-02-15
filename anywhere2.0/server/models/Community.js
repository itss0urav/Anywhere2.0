const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema(
  {
    communityName: {
      type: String,
      required: true,
    },
    logoUrl: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    isNSFW: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Community =
  mongoose.models.community || mongoose.model("community", communitySchema);

module.exports = Community;
