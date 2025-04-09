const { model, Schema } = require("mongoose");
const postSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "user", required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "user" }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: "user" }],
    totalLikes: { type: Number, default: 0 },
    totalDislikes: { type: Number, default: 0 },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    category:{type: Schema.Types.ObjectId,ref:"category"},
    tags:[{type:String}]
  },
  { timestamps: true }
);
const Post = model("post", postSchema);
module.exports = Post;
