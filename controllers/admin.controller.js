const Post = require("../models/post.model");
const User = require("../models/user.model");
const Comment = require("../models/comment.model");
// Get all Users(admin Only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// Delete any post (Admin only)
const deleteAnyPost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// Delete any comment (Admin only)
const deleteAnyComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.commentId);
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// Delete any user (Admin only)
const deleteAnyUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = {
  getAllUsers,
  deleteAnyPost,
  deleteAnyComment,
  deleteAnyUser,
};
