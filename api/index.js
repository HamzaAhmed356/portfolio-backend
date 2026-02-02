const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const contactRoutes = require("../Routes/contactRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/contact", contactRoutes);

// MongoDB connection (cache connection for serverless)
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
}

// Vercel handler
module.exports = async (req, res) => {
  await connectDB();
  return app(req, res);
};
