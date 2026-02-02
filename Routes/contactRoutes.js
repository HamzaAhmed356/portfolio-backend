const express = require("express");
const Contact = require("../Models/contact");

const router = express.Router();

// POST - Save contact message
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, msg: "All fields required" });
    }

    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save();

    res.status(201).json({
      success: true,
      msg: "Message saved successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
});

module.exports = router;
