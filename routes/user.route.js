const express = require("express");
const {
  saveUser,
  userLogin,
  makeAdmin,
  bookMarkPosts,
  getBookmarkedPosts,
} = require("../controllers/user.controller");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddle");
const router = express.Router();
router.post("/register", saveUser);
router.post("/login", userLogin);
router.put("/makeAdmin/:id", authMiddleware, adminMiddleware, makeAdmin);
router.post("/bookmark/:postId", authMiddleware, bookMarkPosts);
router.get("/bookmarks", authMiddleware, getBookmarkedPosts);
module.exports = router;
