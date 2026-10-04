const express = require("express");
const nodemailer = require("nodemailer");

const admin = require("firebase-admin");
const { getDb } = require("../firebaseAdmin");
const rateLimiter = require("../middleware/rateLimiter");

const router = express.Router();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate({ name, email, message }) {
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return "Please enter your name (at least 2 characters).";
  }

  if (
    !email ||
    typeof email !== "string" ||
    !emailRegex.test(email.trim())
  ) {
    return "Please enter a valid email address.";
  }

  if (
    !message ||
    typeof message !== "string" ||
    message.trim().length < 10
  ) {
    return "Please enter a message (at least 10 characters).";
  }

  if (
    name.length > 100 ||
    email.length > 150 ||
    message.length > 5000
  ) {
    return "One of the fields is too long.";
  }

  return null;
};

// Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

router.post(
  "/",
  rateLimiter({ windowMs: 60_000, max: 5 }),
  async (req, res) => {
    const { name, email, message } = req.body || {};

    const validationError = validate({ name, email, message });

    if (validationError) {
      return res.status(400).json({
        error: validationError,
      });
    }

    const db = getDb();

    if (!db) {
      return res.status(503).json({
        error:
          "The contact form is temporarily unavailable. Please email us directly instead.",
      });
    }

    try {
      const cleanName = name.trim();
      const cleanEmail = email.trim();
      const cleanMessage = message.trim();

      // 1. Save submission to Firebase
      await db.collection("submissions").add({
        name: cleanName,
        email: cleanEmail,
        message: cleanMessage,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        source: "website-contact-form",
      });

      // 2. Send email notification
      await transporter.sendMail({
        from: `"SharpHaus Website" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_RECEIVER,
        replyTo: cleanEmail,
        subject: `New Contact Form Message from ${cleanName}`,

        text: `
New Contact Form Submission

Name: ${cleanName}
Email: ${cleanEmail}

Message:
${cleanMessage}
        `,

        html: `
          <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto;">
            <h2 style="color: #111827;">
              New Contact Form Submission
            </h2>

            <p>
              <strong>Name:</strong> ${cleanName}
            </p>

            <p>
              <strong>Email:</strong> ${cleanEmail}
            </p>

            <hr style="margin: 20px 0;" />

            <h3>Message</h3>

            <p style="white-space: pre-line; line-height: 1.6;">
              ${cleanMessage}
            </p>

            <hr style="margin: 20px 0;" />

            <p style="color: #6b7280; font-size: 13px;">
              This message was submitted through the SharpHaus website contact form.
            </p>
          </div>
        `,
      });

      return res.status(201).json({
        success: true,
        message: "Message sent successfully.",
      });
    } catch (err) {
      console.error("Failed to process contact submission:", err);

      return res.status(500).json({
        error: "Something went wrong on our end. Please try again.",
      });
    }
  }
);

module.exports = router;