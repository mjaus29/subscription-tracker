import serverless from "serverless-http";
import app from "../app.js";
import connectToDatabase from "../database/mongodb.js";

let isConnected = false;

const handler = serverless(app);

export default async (event, context) => {
  if (!isConnected) {
    await connectToDatabase();
    isConnected = true;
  }

  return handler(event, context);
};
