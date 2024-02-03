import { Router } from "express";
import * as userController from "../controllers/userController";
import upload from "../middlewares/multer";
import allowOnlyLoggedInUser from "../middlewares/userAuth";
import { sessionMiddleware } from "../middlewares/session";
const userRouter: Router = Router();
const mailRouter: Router = Router();

mailRouter.use(sessionMiddleware);
mailRouter
  .post(
    "/register",
    upload.single("profilePicture"),
    userController.registerUser
  )
  .post("/sendMail", userController.sendMail)
  .post("/sendVerificationMail", userController.sendEmailVerificationMail)
  .post("/verifyOtp", userController.verifyOtp)
  .get("/getEmail", userController.getEmail)
  .post("/resetPassword", userController.resetPassword);

userRouter
  .get("/", allowOnlyLoggedInUser, userController.getUser)
  .post("/login", userController.loginUser)
  .post("/logout", userController.logoutUser)
  .put("/update", upload.single("profilePicture"), userController.updateUser)
  .post("/googleRegister", userController.googleRegister)
  .post("/googleLogin", userController.googleLogin);

export { userRouter, mailRouter };