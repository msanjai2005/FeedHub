import express from "express";
import {
  createPost,
  getAllPosts,
  likePost,
  addComment,
} from "../controllers/postController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/", getAllPosts);

router.post("/", authMiddleware, createPost);

router.put("/:id/like", authMiddleware, likePost);

router.post("/:id/comment", authMiddleware, addComment);

export default router;
