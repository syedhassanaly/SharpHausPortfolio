// Netlify Function: handles the SharpHaus contact form.
// Replaces the old Express backend (backend/src/routes/contact.js).
//
// Required environment variables (set in Netlify > Site configuration > Environment variables):
//   FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY
//   SMTP_USER, SMTP_PASS (Gmail App Password), CONTACT_RECEIVER

import admin from "firebase-admin";
import nodemailer from "nodemailer";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

// Remove accidental wrapping quotes that people paste in from .env files
const clean = (value) => (value || "").trim().replace(/^["']|["']$/g, "");

const escapeHtml = (str) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

function validate({ name, email, message }) {
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return "Please enter your name (at least 2 characters).";
  }
  if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
    return "Please enter a valid email address.";
  }
  if (!message || typeof message !== "string" || message.trim().length < 10) {
    return "Please enter a message (at least 10 characters).";
  }
  if (name.length > 100 || email.length > 150 || message.length > 5000) {
    return "One of the fields is too long.";
  }
  return null;
}

function getDb() {
  const projectId = clean(process.env.FIREBASE_PROJECT_ID);
  const clientEmail = clean(process.env.FIREBASE_CLIENT_EMAIL);
  // Netlify stores the key on one line with literal "\n" characters, so convert them back
  const privateKey = clean(process.env.FIREBASE_PRIVATE_KEY).replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("Firebase credentials are missing in Netlify environment variables.");
  }

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
    });
  }
  return admin.firestore();
}

async function saveToFirestore({ name, email, message }) {
  const db = getDb();
  await db.collection("submissions").add({
    name,
    email,
    message,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    source: "website-contact-form",
  });
}

async function sendEmail({ name, email, message }) {
  const user = clean(process.env.SMTP_USER);
  // Gmail shows app passwords with spaces; they must be removed
  const pass = clean(process.env.SMTP_PASS).replace(/\s+/g, "");
  const to = clean(process.env.CONTACT_RECEIVER);

  if (!user || !pass || !to) {
    throw new Error("Email settings (SMTP_USER, SMTP_PASS, CONTACT_RECEIVER) are missing.");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);

  await transporter.sendMail({
    from: `"SharpHaus Website" <${user}>`,
    to,
    replyTo: email,
    subject: `New Contact Form Message from ${name.replace(/[\r\n]+/g, " ")}`,
    text: `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto;">
        <h2 style="color: #111827;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <hr style="margin: 20px 0;" />
        <h3>Message</h3>
        <p style="white-space: pre-line; line-height: 1.6;">${safeMessage}</p>
        <hr style="margin: 20px 0;" />
        <p style="color: #6b7280; font-size: 13px;">
          This message was submitted through the SharpHaus website contact form.
        </p>
      </div>
    `,
  });
}

export default async (req) => {
  if (req.method !== "POST") {
    return json(405, { error: "Method not allowed." });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return json(400, { error: "Invalid request." });
  }

  // Honeypot: bots fill this hidden field. Pretend success and drop the message.
  if (body && body["bot-field"]) {
    return json(201, { success: true, message: "Message sent successfully." });
  }

  const { name, email, message } = body || {};
  const validationError = validate({ name, email, message });
  if (validationError) {
    return json(400, { error: validationError });
  }

  const data = {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
  };

  // Run both; the visitor sees success if at least one worked,
  // so a message is never lost because one service had a problem.
  const [saved, emailed] = await Promise.allSettled([
    saveToFirestore(data),
    sendEmail(data),
  ]);

  if (saved.status === "rejected") {
    console.error("Firestore save failed:", saved.reason);
  }
  if (emailed.status === "rejected") {
    console.error("Email send failed:", emailed.reason);
  }

  if (saved.status === "rejected" && emailed.status === "rejected") {
    return json(500, {
      error: "Something went wrong on our end. Please try again or email us directly.",
    });
  }

  return json(201, { success: true, message: "Message sent successfully." });
};
