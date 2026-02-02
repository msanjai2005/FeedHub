import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    likes: {
      type: [String],
      default: [],
    },
    comments: {
      type: [commentSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
