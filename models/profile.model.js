const { Schema, model } = require("mongoose");
const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    maxlength: 500,
  },
  avatar: {
    type: String,
    default: "/public/images/boy.jpg",
  },
  socialLinks: {
    twitter: { type: String },
    linkedin: { type: String },
    github: { type: String },
  }
},{timestamps: true});
const Profile = model("profile",profileSchema);
module.exports = Profile;
