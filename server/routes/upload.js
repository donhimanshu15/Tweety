import express from "express";
import { verifyToken } from "../verifyToken.js";
import { uploadSingleImage } from "../controllers/upload.js";
import { uploadMultipleImages } from "../uploadImage.js";

const router = express.Router();

// Create a Tweet
router.post("/uploadImage", uploadSingleImage);
router.post("/uploadMultipleImage", uploadMultipleImages);

export default router;
