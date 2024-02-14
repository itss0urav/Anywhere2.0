const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();
const { logMiddleware } = require("./middlewares/logMiddleware");
// const cookieParser = require("cookie-parser");
//routes
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const replyRoutes = require("./routes/replyRoute");
const voteRoutes = require("./routes/voteRoutes");
const logRoutes = require("./routes/logRoutes");
const communityRoutes = require("./routes/communityRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// middlewares
app.use(express.json());
app.use(express.static("public"));
app.use(logMiddleware);

// app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//routes
app.use(logRoutes);
app.use("/api/users", userRoutes);
app.use("/api/users", adminRoutes);
app.use("/api/admin/", adminRoutes);
app.use("/api/posts/reports", adminRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/posts", adminRoutes);
app.use("/api/posts", voteRoutes);
app.use("/api/posts/:id/comments", commentRoutes);
app.use("/api/posts/:id/comments/:commentId/votes", commentRoutes);
app.use("/api/posts/:id/comments/:commentId/delete", commentRoutes);
app.use("/api/posts/:postId/comments/:commentId/replies", replyRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
