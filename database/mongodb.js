import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) return;

  if (!DB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.<development/production>.local",
    );
  }

  try {
    await mongoose.connect(DB_URI);
    isConnected = true;
    console.log(`✅ Connected to MongoDB in ${NODE_ENV} mode`);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    throw err;
  }
};

export default connectToDatabase;
