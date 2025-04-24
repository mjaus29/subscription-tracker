import serverless from "serverless-http";
import app from "../app.js";
import connectToDatabase from "../database/mongodb.js";

await connectToDatabase();

export const handler = serverless(app);
