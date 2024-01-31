const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Banner = require("../models/bannerModel.js");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync("public/files", { recursive: true });
    cb(null, "public/files");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

exports.uploadBanner = upload.single("photo");

exports.createBanner = (req, res) => {
  const { name } = req.body;
  const image = req.file.filename;
  const banner = new Banner({ name, image });
  banner
    .save()
    .then(() => res.json("Banner added!"))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.getBanners = (req, res) => {
    Banner.find()
    .then((banners) => res.json(banners))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.deleteBanners = async (req, res) => {
  const { id, name } = req.body;
  try {
    await Banner.findByIdAndDelete(id);
    const filePath = `public/files/${name}`;
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) throw err;
        console.log(`${filePath} was deleted`);
      });
    }
    res.status(200).json({ passed: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred" });
  }
};
