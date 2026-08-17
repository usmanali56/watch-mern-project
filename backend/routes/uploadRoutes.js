import express from "express";
import upload from "../middleware/upload.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();
router.post("/", protect, adminOnly, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Koi image nahi mili" });
  }

 
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.status(201).json({ imageUrl });
});

export default router;