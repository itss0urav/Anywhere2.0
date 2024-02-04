const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  { name: String, image: String },
  { strict: true, timestamps: true }
);

const Banner =
  mongoose.models.banners || mongoose.model("banners", bannerSchema);

module.exports = Banner;
