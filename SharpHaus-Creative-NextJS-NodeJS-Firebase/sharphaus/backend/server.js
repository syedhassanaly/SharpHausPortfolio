require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const { initFirebase } = require("./src/firebaseAdmin");
const contactRoute = require("./src/routes/contact");

const app = express();

initFirebase();

const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000")
  .split(",")
  .map((o) => o.trim());

app.use(helmet());
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  })
);
app.use(express.json({ limit: "50kb" }));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.use("/api/contact", contactRoute);

// Fallback 404 for unknown API routes
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Generic error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`SharpHaus backend listening on http://localhost:${PORT}`);
});
