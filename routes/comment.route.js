const express = require("express");
const { authMiddleware } = require("../middleware/authMiddle");
const {
  addComment,
  getPostComments,
  deleteComment,
} = require("../controllers/comment.controller");
const router = express.Router();
// add comment to a post
router.post("/:postId/comment", authMiddleware, addComment);
// get all comments for a particular post(No authentication needed)
router.get("/:postId/comments", getPostComments);
// // Delete a comment
router.delete("/:postId/comment/:commentId", authMiddleware, deleteComment);

module.exports = router;
