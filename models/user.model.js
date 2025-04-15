const { model, Schema } = require("mongoose");
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }, 
  bookmarkedPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: "post", 
    },
  ],
});
const User = model("user", userSchema);
module.exports = User;
