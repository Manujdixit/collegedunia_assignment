import { Router } from "express";
import { register, login } from "../controllers/user.js";

export const userRouter = Router();

userRouter.route("/register").post(register);
userRouter.route("/login").post(login);
