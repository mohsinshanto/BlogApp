const express = require("express");
const path = require("path");
const { connectDb } = require("./config/db");
const userRoutes = require("./routes/user.route");
const postRoutes = require("./routes/post.route");
const commentRoute = require("./routes/comment.route");
const userProfileRoute = require("./routes/profile.route");
const adminRoutes = require("./routes/admin.route");
const categoryRoutes = require("./routes/category.route");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
connectDb(process.env.MONGO_URI);
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", postRoutes);
app.use("/api", commentRoute);
app.use("/api/profile", userProfileRoute);
app.use("/api/admin", adminRoutes);
app.use("/api/category", categoryRoutes);
app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
