const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
// Load environment variables from .env
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
app.use(cookieParser());
app.options('*', cors({credentials: true, origin:"*"}));
app.use(
  cors({credentials: true, origin:"http://localhost:3000"})
);
app.use(express.json());

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
