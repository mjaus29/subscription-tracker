import serverless from "serverless-http";
import app from "../app.js";
import connectToDatabase from "../database/mongodb.js";

let handler;
let isDatabaseConnected = false;

export default async (req, res) => {
  if (!isDatabaseConnected) {
    try {
      await connectToDatabase();
      isDatabaseConnected = true;
    } catch (error) {
      console.error("Database connection error:", error);
      return res.status(500).json({ error: "Database connection failed" });
    }
  }

  if (!handler) {
    handler = serverless(app);
  }

  return handler(req, res);
};
