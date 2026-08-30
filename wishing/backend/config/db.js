const mongoose = require("mongoose");

const connectDB = async () => {
  // Disable query buffering when MongoDB is not connected
  mongoose.set("bufferCommands", false);

  if (!process.env.MONGO_URI) {
    console.warn("⚠️ MONGO_URI is not defined in environment variables. Running in database-less mode.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    console.warn("⚠️ Server starting without database connection...");
  }
};

module.exports = connectDB;
