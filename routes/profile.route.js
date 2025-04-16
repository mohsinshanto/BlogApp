const express = require("express");
const { authMiddleware } = require("../middleware/authMiddle");
const upload = require("../middleware/uploadMiddleware");
const {
  createProfile,
  getProfile,
  updateProfile,
  uploadAvatar,
} = require("../controllers/profile.controller");

const router = express.Router();

router.post("/create", authMiddleware, createProfile);
router.get("/:userId", getProfile);
router.put("/update", authMiddleware, updateProfile);
router.put("/avatar", authMiddleware, upload.single("avatar"), uploadAvatar);
module.exports = router;
