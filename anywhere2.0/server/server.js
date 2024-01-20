const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const replyRoutes = require("./routes/replyRoute");

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
app.use("/api/users", adminRoutes);
app.use("/api/admin/", adminRoutes);
app.use("/api/posts/reports", adminRoutes);

app.use("/api/posts", postRoutes);
app.use("/api/posts", adminRoutes);
app.use("/api/posts/:id/comments", commentRoutes); // <- This route should come before the /votes route
app.use("/api/posts/:id/comments/:commentId/votes", commentRoutes); // <- This route handles comment votes
app.use("/api/posts/:id/comments/:commentId/delete", commentRoutes); // <- This route handles comment votes
app.use("/api/posts/:postId/comments/:commentId/replies", replyRoutes);

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
