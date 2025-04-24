import serverless from "serverless-http";
import app from "../app.js";
import connectToDatabase from "../database/mongodb.js";

let handler;

export default async (req, res) => {
  await connectToDatabase();

  if (!handler) {
    handler = serverless(app);
  }

  return handler(req, res);
};
