// Basic Imports
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express, { Express } from "express";
import mongoose from "mongoose";
import path from "path";
// Router Imports
import userRouter from "./routes/userRouter";
// Session Management
import MongoDBStore from "connect-mongodb-session";
import session from "express-session";

// Creating Backend Application
const app: Express = express();

// Initialize MongoDBStore using session
const MongoStore = MongoDBStore(session);

// Creating a new MongoDBStore
const store: MongoDBStore.MongoDBStore = new MongoStore({
  uri: process.env.DB_URL!,
  collection: "sessions",
});

// Middlewares
app.use(
  session({
    secret: process.env.SECRET_KEY!,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: "none",
    },
  })
);
// Basic Middlewares
app.use(
  cors({
    origin: "https://advanced-login-app.vercel.app",
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
