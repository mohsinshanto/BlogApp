const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const saveUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      res.status(400).json({ meg: `One of the input is missing` });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashpassword });
    await newUser.save();
    res.status(201).json({ msg: "newUser has created" });
  } catch (error) {
    res.status(500).json({ msg: `${error.message}` });
  }
};
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }
    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error. Please try again later." });
  }
};
const makeAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ msg: "User hasn't found!!" });
    }
    user.isAdmin = true;
    await user.save();
    res.status(200).json({ msg: "User Promoted to admin", user });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = { saveUser, userLogin,makeAdmin };
