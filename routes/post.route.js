const express = require("express");
const { authMiddleware } = require("../middleware/authMiddle");
const {
  createPost,
  singularPost,
  getAllPosts,
  selectedUserPosts,
  updatePost,
  deletePost,
} = require("../controllers/post.controller");
const router = express.Router();
// Creating post
router.post("/post/create", authMiddleware, createPost);
// Retriving post
router.get("/userPosts", authMiddleware, selectedUserPosts);
router.get("/post/:postId", singularPost);
router.get("/posts", getAllPosts);
// Updating post
router.put("/post/:postId", authMiddleware, updatePost);
// deleting post
router.delete("/post/:postId", authMiddleware, deletePost);

module.exports = router;
