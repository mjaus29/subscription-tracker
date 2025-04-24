import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    if (!DB_URI) {
      throw new Error("Please define the MONGODB_URI environment variable.");
    }

    try {
      await mongoose.connect(DB_URI);
      console.log(`✅ MongoDB connected successfully in ${NODE_ENV} mode`);
    } catch (error) {
      console.error("❌ MongoDB connection error:", error);
      throw error;
    }
  }

  return mongoose.connection;
};

export default connectToDatabase;
