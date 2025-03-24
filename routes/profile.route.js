const express = require("express");
const { authMiddleware } = require("../middleware/authMiddle");
const {
  createProfile,
   getProfile,
   updateProfile,
} = require("../controllers/profile.controller");

const router = express.Router();

router.post("/create", authMiddleware, createProfile);
router.get("/:userId", getProfile);
router.put("/update", authMiddleware, updateProfile);

module.exports = router;
