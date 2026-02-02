import express from "express";
import {
  createPost,
  getAllPosts,
  likePost,
  addComment,
} from "../controllers/postController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* ---------------- POST ROUTES ---------------- */

// Public feed
router.get("/", getAllPosts);

// Create post (protected)
router.post("/", authMiddleware, createPost);

// Like / Unlike post (protected)
router.put("/:id/like", authMiddleware, likePost);

// Add comment (protected)
router.post("/:id/comment", authMiddleware, addComment);

export default router;
