const express = require("express");
const { saveUser, userLogin } = require("../controllers/user.controller");
const router = express.Router();
router.post("/register", saveUser);
router.post("/login", userLogin);

module.exports = router;
