// Basic Imports
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express, { Express } from "express";
import mongoose from "mongoose";
import path from "path";
import cron from "node-cron";
// File Imports
import { mailRouter, userRouter } from "./routes/userRouter";
import { clearExpiredSessions } from "./utils/sessionUtils";

// Creating Backend Application
const app: Express = express();

// Set Trust Proxy
app.set("trust proxy", true);
// Middlewares
app.use(
  cors({
    origin: ["https://advanced-login-app.vercel.app", "http:localhost:8080"],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view-engine", "ejs");
app.set("views", path.resolve("./views"));

// Routes
app.use("/uploads", express.static("uploads"));
app.use("/user", userRouter);
app.use("/user", mailRouter);

// Session Cleanup
cron.schedule(
  "*/30 * * * * *",
  async () => {
    console.log("Running session cleanup job...");
    try {
      await clearExpiredSessions();
      console.log("Session cleanup completed.");
    } catch (error) {
      console.error("Error during session cleanup:", error);
    }
  },
  {
    scheduled: true,
    timezone: "Asia/Kolkata",
  }
);

// DB Connection
const PORT: number = 8080 | Number(process.env.PORT);
const DB_URL: string = String(process.env.DB_URL);

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Database Connected");
    app.listen(PORT, () => {
      console.log("Server Started");
    });
  })
  .catch((err) => {
    console.log(err);
  });
