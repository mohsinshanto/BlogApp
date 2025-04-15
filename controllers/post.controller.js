const Post = require("../models/post.model");
// creating post
const createPost = async (req, res) => {
  const { title, content, status, tags, category } = req.body;
  const { id } = req.user;
  if (!title || !content) {
    return res
      .status(400)
      .json({ msg: "All the fields(title,content) need to be filled" });
  }
  try {
    const newPost = new Post({
      title,
      content,
      author: id,
      status: status || "draft",
      tags,
      category,
    });
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
    const posts = await Post.find({ author }).populate("author", "username");
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
// get All posts
const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;
    const totalPosts = await Post.countDocuments({ status: "published" });
    const posts = await Post.find({ status: "published" })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("author", "username")
      .populate("category", "name");
    if (posts.length === 0) {
      return res.status(200).json([]);
    }
    res
      .status(200)
      .json({
        totalPosts,
        totalPage: Math.ceil(totalPosts / limit),
        currentPage: page,
        posts,
      });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};
// get only my draft posts
const getMyDrafts = async (req, res) => {
  const { id } = req.user;
  try {
    const drafts = await Post.find({ author: id, status: "draft" });
    if (drafts.length === 0) {
      return res.status(200).json({ msg: "You have draft post" });
    }
    res.status(200).json(drafts);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};
// like the post
const likesOfPost = async (req, res) => {
  const { postId } = req.params;
  const { id } = req.user;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ msg: "post not found" });
    }
    if (post.dislikes.map((dislike) => dislike.toString()).includes(id)) {
      post.dislikes = post.dislikes.filter(
        (element) => element.toString() !== id
      );
      post.totalDislikes -= 1;
    }
    if (post.likes.map((like) => like.toString()).includes(id)) {
      return res.status(404).json({ msg: "You have already liked this post" });
    }
    post.likes.push(id);
    post.totalLikes += 1;
    await post.save();
    res.status(201).json({ msg: "Post has been liked" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};
// dislike the post
const dislikesOfPost = async (req, res) => {
  const { postId } = req.params;
  const { id } = req.user;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).json({ msg: "Post hasn't found" });
    }
    if (post.likes.map((like) => like.toString()).includes(id)) {
      post.likes = post.likes.filter((element) => element.toString() !== id);
      post.totalLikes -= 1;
    }
    if (post.dislikes.map((dislike) => dislike.toString()).includes(id)) {
      return res
        .status(400)
        .json({ msg: "You have already unliked this post" });
    }
    post.dislikes.push(id);
    post.totalDislikes += 1;
    await post.save();
    res.status(200).json({ msg: "Post unliked successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
};
// Publishing post
const publishPost = async (req, res) => {
  const { postId } = req.params;
  const { id } = req.user;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ msg: "Post hasn't found" });
    }
    if (post.author.toString() !== id) {
      return res.status(403).json({ msg: "Not authorized" });
    }
    post.status = "published";
    await post.save();
    res.status(201).json({ msg: "Post published successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};
// Filtering post by category
const getPostByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const posts = await Post.find({ category: categoryId })
      .populate("author", "username")
      .populate("category", "name");
    if (posts.length === 0) {
      return res
        .status(400)
        .json({ msg: "No post available related to this category" });
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
// Filtering post by tag
const getPostByTag = async (req, res) => {
  const { tag } = req.params;
  try {
    const posts = await Post.find({ tags: tag })
      .populate("author", "username")
      .populate("category", "name");
    if (posts.length === 0) {
      return res
        .status(400)
        .json({ msg: "No post available related to this tag" });
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = {
  createPost,
  singularPost,
  getAllPosts,
  selectedUserPosts,
  updatePost,
  deletePost,
  likesOfPost,
  dislikesOfPost,
  publishPost,
  getMyDrafts,
  getPostByCategory,
  getPostByTag,
};
