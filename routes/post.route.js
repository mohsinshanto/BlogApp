const express = require("express");
const { authMiddleware } = require("../middleware/authMiddle");
const {
  createPost,
  singularPost,
  getAllPosts,
  selectedUserPosts,
  updatePost,
  deletePost,
  likesOfPost,
  dislikesOfPost,
  publishPost,
  getMyDrafts,
} = require("../controllers/post.controller");
const router = express.Router();
// Creating post
router.post("/post/create", authMiddleware, createPost);
// get all user posts
router.get("/userPosts", authMiddleware, selectedUserPosts);
// get a user only draft posts
router.get("/post/draft", authMiddleware, getMyDrafts);
router.get("/post/:postId", singularPost);
router.get("/posts", getAllPosts);
// Updating post
router.put("/post/:postId", authMiddleware, updatePost);
// deleting post
router.delete("/post/:postId", authMiddleware, deletePost);
// Post like
router.post("/post/:postId/like", authMiddleware, likesOfPost);
// Post dislike
router.post("/post/:postId/dislike", authMiddleware, dislikesOfPost);
// post publishement
router.put("/post/:postId/publish", authMiddleware, publishPost);

module.exports = router;
