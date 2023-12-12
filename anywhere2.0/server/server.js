const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

// Load environment variables from .env
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
app.use(cors());
app.use(express.json());

// Use routes
app.use("/user", userRoutes);
app.use("/posts", postRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
