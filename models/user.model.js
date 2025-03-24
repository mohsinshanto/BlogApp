const { model, Schema } = require("mongoose");
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }, // Admin field
});
const User = model("user", userSchema);
module.exports = User;
