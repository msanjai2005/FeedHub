import express from "express";
import { signup, login, logout,checkAuth } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router();

/* ---------------- AUTH ROUTES ---------------- */

// Signup
router.post("/signup", signup);

// Login
router.post("/login", login);

// Logout
router.post("/logout", logout);

router.get("/is-auth",authMiddleware,checkAuth);

export default router;
