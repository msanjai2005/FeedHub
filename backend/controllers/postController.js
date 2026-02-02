import Post from "../models/Post.js";
import User from "../models/User.js";

/*----------------------------------------------------
   CREATE POST
--------------------------------------------------- */
export const createPost = async (req, res) => {
  try {
    const { text, image } = req.body;

    if (!text && !image) {
      return res.status(400).json({
        success: false,
        message: "Post must contain text or image",
      });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const post = await Post.create({
      userId: user._id,
      username: user.username,
      text: text || "",
      image: image || "",
    });

    return res.status(201).json({
      success: true,
      message: "Post created",
      post,
    });
  } catch (error) {
    console.error("Create post error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to create post",
    });
  }
};

/* ---------------------------------------------------
   GET ALL POSTS (PUBLIC FEED)
--------------------------------------------------- */
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error("Fetch posts error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch posts",
    });
  }
};

/* ---------------------------------------------------
   LIKE / UNLIKE POST
--------------------------------------------------- */
export const likePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const alreadyLiked = post.likes.includes(user.username);

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (username) => username !== user.username
      );
    } else {
      post.likes.push(user.username);
    }

    await post.save();

    return res.status(200).json({
      success: true,
      likesCount: post.likes.length,
      likes: post.likes,
    });
  } catch (error) {
    console.error("Like post error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to like post",
    });
  }
};

/* ---------------------------------------------------
   ADD COMMENT
--------------------------------------------------- */
export const addComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Comment text is required",
      });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    post.comments.push({
      username: user.username,
      text,
    });

    await post.save();

    return res.status(201).json({
      success: true,
      commentsCount: post.comments.length,
      comments: post.comments,
    });
  } catch (error) {
    console.error("Add comment error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to add comment",
    });
  }
};
