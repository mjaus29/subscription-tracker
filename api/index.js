import serverless from "serverless-http";
import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "../routes/user.routes.js";
import authRouter from "../routes/auth.routes.js";
import subscriptionRouter from "../routes/subscription.routes.js";
import workflowRouter from "../routes/workflow.routes.js";
import errorMiddleware from "../middlewares/error.middleware.js";
import arcjetMiddleware from "../middlewares/arcjet.middleware.js";
import connectToDatabase from "../database/mongodb.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);

app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    console.log("MongoDB connected successfully.");
    next();
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return res.status(500).json({ error: "Failed to connect to the database" });
  }
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/workflows", workflowRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  console.log("Root route hit");
  res.status(200).send("Welcome to the Subscription Tracker API!");
});

export default serverless(app);
