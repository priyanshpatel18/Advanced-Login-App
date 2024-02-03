import { Request, Response } from "express";
import { storeInstance } from "../middlewares/session";

export const deleteSession = async (req: Request, res: Response) => {
  const sessionId = req.sessionID;

  // Destroy Session
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error destroying session");
    }

    // Delete session from MongoDB database using storeInstance
    storeInstance.destroy(sessionId, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error deleting session from database");
      }
      console.log("Session deleted from database");
    });
  });
};
