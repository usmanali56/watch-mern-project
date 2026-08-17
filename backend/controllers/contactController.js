import Contact from "../models/Contact.js";

// @route POST /api/contact  (public - koi bhi message bhej sakta hai)
export const submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email and message are important" });
    }

    const contact = await Contact.create({ name, email, phone, subject, message });
    res.status(201).json({ message: "We have received your message. We will get back to you shortly.", contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/contact  (admin only - sab messages dekhna)
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route PUT /api/contact/:id/read  (admin only - message ko "read" mark karna)
export const markAsRead = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!contact) return res.status(404).json({ message: "Message not found" });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route DELETE /api/contact/:id  (admin only)
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: "Message received" });
    res.json({ message: "Message delete ho gaya" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};