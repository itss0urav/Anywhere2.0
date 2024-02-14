const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema(
  {
    communityName: {
      type: String,
      required: true,
    },
    logoUrl: {
      type: String,
      required: true,
      default:
        "https://img.freepik.com/premium-photo/violet-pink-blue-cyan-universe-nebula-stars_410516-23647.jpg",
    },
    isNSFW: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { strict: true, timestamps: true }
);

const Community =
  mongoose.models.community || mongoose.model("community", communitySchema);

module.exports = Community;
