const Profile = require("../models/profile.model");

const createProfile = async (req, res) => {
  const { name, bio, avatar, socialLinks } = req.body;
  const userId = req.user.id;

  try {
    let profile = await Profile.findOne({ user: userId });

    if (profile) {
      return res
        .status(400)
        .json({ message: "Profile already exists. Use update instead." });
    }

    profile = new Profile({ user: userId, name, bio, avatar, socialLinks });
    await profile.save();
    res.status(201).json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.userId }).populate(
      "user",
      "username email"
    );
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
const updateProfile = async (req, res) => {
  const { name, bio, avatar, socialLinks } = req.body;
  const userId = req.user.id;

  try {
    let profile = await Profile.findOne({ user: userId });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    profile.name = name || profile.name;
    profile.bio = bio || profile.bio;
    profile.avatar = avatar || profile.avatar;
    profile.socialLinks = socialLinks || profile.socialLinks;

    await profile.save();
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createProfile, getProfile, updateProfile };
