const express = require("express");
const router = express.Router();
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddle");
const {
  getAllUsers,
  deleteAnyPost,
  deleteAnyComment,
  deleteAnyUser,
} = require("../controllers/admin.controller");
// Get all users (Admin only)
router.get("/users", authMiddleware, adminMiddleware, getAllUsers);
// Delete any post (Admin only)
router.delete("/post/:postId", authMiddleware, adminMiddleware, deleteAnyPost);
// Delete any comment (Admin only)
router.delete(
  "/comment/:commentId",
  authMiddleware,
  adminMiddleware,
  deleteAnyComment
);
// Delete any user (Admin only)
router.delete("/user/:userId", authMiddleware, adminMiddleware, deleteAnyUser);

module.exports = router;
