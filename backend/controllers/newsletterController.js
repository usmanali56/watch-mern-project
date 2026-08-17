import Newsletter from "../models/Newsletter.js";

// @route POST /api/newsletter  (public - koi bhi subscribe kar sakta hai)
export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const alreadySubscribed = await Newsletter.findOne({ email });
    if (alreadySubscribed) {
      return res.status(400).json({ message: "This email already subscribe " });
    }

    await Newsletter.create({ email });
    res.status(201).json({ message: "You have successfully subscribed. Thank you!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/newsletter  (admin only - sab subscribers dekhna)
export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route DELETE /api/newsletter/:id  (admin only)
export const deleteSubscriber = async (req, res) => {
  try {
    const subscriber = await Newsletter.findByIdAndDelete(req.params.id);
    if (!subscriber) return res.status(404).json({ message: "Subscriber not found" });
    res.json({ message: "Subscriber has been deleted." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};