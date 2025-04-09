const express = require("express");
const { saveUser, userLogin,makeAdmin } = require("../controllers/user.controller");
const {authMiddleware,adminMiddleware} = require("../middleware/authMiddle");
const router = express.Router();
router.post("/register", saveUser);
router.post("/login", userLogin);
router.put("/makeAdmin/:id",authMiddleware,adminMiddleware,makeAdmin);

module.exports = router;
