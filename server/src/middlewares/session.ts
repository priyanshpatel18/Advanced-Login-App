// Session Management
import session from "express-session";
import MongoDBStore from "connect-mongodb-session";
import { NextFunction, Request, Response } from "express";

// Initialize session middleware only when sendMail is executed
const MongoStoreInstance = MongoDBStore(session);
const storeInstance: MongoDBStore.MongoDBStore = new MongoStoreInstance({
  uri: process.env.DB_URL!,
  collection: "sessions",
});
const sessionMiddleware = (req: Request, res: Response, next: NextFunction) => {
  return session({
    secret: process.env.SECRET_KEY!,
    resave: false,
    saveUninitialized: true,
    store: storeInstance,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "strict",
    },
  })(req, res, next);
};

export { sessionMiddleware, storeInstance };
