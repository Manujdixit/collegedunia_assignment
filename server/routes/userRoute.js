import { Router } from "express";
import { register, login, updateProfile } from "../controllers/user.js";
import { auth } from "../middlewares/auth.js";

export const userRouter = Router();

userRouter.route("/register").post(register);
userRouter.route("/login").post(login);
userRouter.route("/profile").put(auth, updateProfile);
