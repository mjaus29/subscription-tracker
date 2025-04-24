import serverless from "serverless-http";
import app from "../app.js";
import connectToDatabase from "../database/mongodb.js";

await connectToDatabase();

const handler = serverless(app);

export default async (event, context) => {
  return handler(event, context);
};
