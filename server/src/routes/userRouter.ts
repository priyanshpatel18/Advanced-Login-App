import { Router } from "express";
import * as userController from "../controllers/userController";
import upload from "../middlewares/multer";
import allowOnlyLoggedInUser from "../middlewares/userAuth";
const userRouter: Router = Router();

userRouter
.get("/", allowOnlyLoggedInUser ,userController.getUser)
.get("/getEmail", userController.getEmail)
.post("/login", userController.loginUser)
.post("/register",upload.single("profilePicture"),userController.registerUser)
.post("/logout", userController.logoutUser)
.put("/update", upload.single("profilePicture"), userController.updateUser)
.post("/sendMail", userController.sendMail)
.post("/verifyOtp", userController.verifyOtp)
.post("/resetPassword", userController.resetPassword)
.post("/googleRegister", userController.googleRegister)
.post("/googleLogin", userController.googleLogin)

export default userRouter;
