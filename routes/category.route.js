const express = require("express");
const {authMiddleware,adminMiddleware} = require("../middleware/authMiddle");
const {
  createCategory,
  getAllCategory,
} = require("../controllers/category.controller");
const router = express.Router();
router.post("/",authMiddleware,adminMiddleware, createCategory);
router.get("/", getAllCategory);
module.exports = router;
