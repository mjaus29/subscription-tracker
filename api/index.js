import serverless from "serverless-http";
import app from "../app.js";
import connectToDatabase from "../database/mongodb.js";

let isConnected = false;

export const handler = async (event, context) => {
  if (!isConnected) {
    await connectToDatabase();
    isConnected = true;
  }
  const handler = serverless(app);
  return handler(event, context);
};
