import express from "express";
import { subscribe, getSubscribers, deleteSubscriber } from "../controllers/newsletterController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

// Public - koi bhi subscribe kar sakta hai
router.post("/", subscribe);

// Admin only
router.get("/", protect, adminOnly, getSubscribers);
router.delete("/:id", protect, adminOnly, deleteSubscriber);

export default router;