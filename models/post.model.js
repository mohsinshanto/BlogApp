const { model, Schema } = require("mongoose");
const postSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "user", required: true },
  },
  { timestamps: true }
);
const Post = model("post", postSchema);
module.exports = Post;
