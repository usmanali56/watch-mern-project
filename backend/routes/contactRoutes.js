import express from "express";
import {
  submitContact,
  getContacts,
  markAsRead,
  deleteContact,
} from "../controllers/contactController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

// Public - koi bhi form submit kar sakta hai
router.post("/", submitContact);

// Admin only
router.get("/", protect, adminOnly, getContacts);
router.put("/:id/read", protect, adminOnly, markAsRead);
router.delete("/:id", protect, adminOnly, deleteContact);

export default router;