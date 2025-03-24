const Post = require("../models/post.model");
// creating post
const createPost = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.user;
  if (!title || !content) {
    res
      .status(400)
      .json({ msg: "All the fields(title,content) need to be filled" });
  }
  try {
    const newPost = new Post({ title, content, author: id });
    await newPost.save();
    res.status(201).json({ msg: "New post created" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server Error" });
  }
};
// retriving post
const selectedUserPosts = async (req, res) => {
  const { id } = req.user;
  const author = id;
  try {
    const posts = await Post.find({ author });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
// updating post
const updatePost = async (req, res) => {
  const postId = req.params.postId;
  const { id } = req.user;
  try {
    const { title, content } = req.body;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    if (post.author.toString() !== id) {
      return res.status(403).json({ msg: "Unauthorized" });
    }
    post.title = title || post.title;
    post.content = content || post.content;
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};
// deleting post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Unauthorized" });
    }
    await post.deleteOne();
    res.status(200).json({ msg: "Post successfully deleted✌" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};
const singularPost = async (req, res) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      res.status(404).json({ msg: "Post not found!" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    if (!posts) {
      res.status(200).json([]);
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = {
  createPost,
  singularPost,
  getAllPosts,
  selectedUserPosts,
  updatePost,
  deletePost,
};
