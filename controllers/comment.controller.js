const Comment = require("../models/comment.model");
const Post = require("../models/post.model");
const addComment = async (req, res) => {
  const { postId } = req.params;
  const { text } = req.body;
  try {
    // check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    // Check if the text is provided
    if (!text || text.trim() === "") {
      return res.status(400).json({ msg: "Comment text can't be empty" });
    }
    // create the comment
    const comment = new Comment({
      text,
      user: req.user.id,
      post: postId,
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};
const getPostComments = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = Post.findById(postId);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    const comments = await Comment.find({ post: postId })
      .populate("user", "username email")
      .sort({ createdAt: -1 });
      res.status(200).json(comments);
  } catch (error) {
   res.status(500).json({msg:"Server Error"})
  }
};
const deleteComment = async(req,res)=>{
   const {postId,commentId} = req.params;
   try{
      const comment = await Comment.findById(commentId);
      if(!comment){
         return res.status(404).json({msg:"Comment not found"});
      }
      if(comment.post.toString() !== postId){
         return res.status(400).json({msg:"Comment doesn't belong to this post"});
      }
      if(comment.user.toString()!==req.user.id){
         return res.status(403).json({msg:"Not authorized to delete this comment"});
      }
      await comment.deleteOne();
      res.status(200).json({msg:"Comment deleted successfully"});
   }catch(error){
      res.status(500).json({msg:"Server Error"})
   }
}
module.exports = { addComment,getPostComments,deleteComment };
