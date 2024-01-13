const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(express.json());
app.use(cookieParser());



app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/posts/:id/comments", commentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// optional
// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true,
// };

// app.use("/api/users", cors(corsOptions), userRoutes);
// app.use("/api/posts", cors(corsOptions), postRoutes);
