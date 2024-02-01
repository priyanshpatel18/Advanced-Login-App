import MongoDBStore from "connect-mongodb-session";
import { NextFunction, Request, Response } from "express";
import session from "express-session";

// Initialize MongoDBStore using session
const MongoStore = MongoDBStore(session);

// Creating a new MongoDBStore
const store = new MongoStore({
  uri: process.env.DB_URL!,
  collection: "sessions",
});

const sessionMiddleware = session({
  secret: process.env.SECRET_KEY!,
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: {
    secure: true,
    httpOnly: true,
    sameSite: "none",
  },
});

export default function (req: Request, res: Response, next: NextFunction) {
  sessionMiddleware(req, res, next);
}
