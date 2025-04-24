// lib/connectToDatabase.js
import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) return mongoose.connection;

  if (!DB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable.");
  }

  try {
    await mongoose.connect(DB_URI);
    isConnected = true;
    console.log(`✅ MongoDB connected successfully in ${NODE_ENV} mode`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }

  return mongoose.connection;
};

export default connectToDatabase;
