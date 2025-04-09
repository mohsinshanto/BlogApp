const Category = require("../models/category.model");
const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ msg: "Category is required" });
    }
    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(400).json({ msg: "This category is already exists" });
    }
    const category = new Category({ name });
    await category.save();
    res.status(201).json({ msg: "New Category is created ", category });
  } catch (err) {
    res.status(500).json({ msg: "Internal server Error" });
  }
};
const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return res.status(400).json({ msg: "There is no category to fetch" });
    }
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error", err });
  }
};
module.exports = { createCategory, getAllCategory };
