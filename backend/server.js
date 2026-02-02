import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();

const app = express();

/* -------------------- MIDDLEWARE -------------------- */
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // frontend URL
    credentials: true,               // IMPORTANT for cookies
  })
);
app.use(express.json());
app.use(cookieParser());

/* -------------------- ROUTES -------------------- */
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

/* -------------------- DEFAULT ROUTE -------------------- */
app.get("/", (req, res) => {
  res.send("Mini Social App API is running");
});

/* -------------------- DB CONNECTION -------------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

/* -------------------- SERVER START -------------------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
