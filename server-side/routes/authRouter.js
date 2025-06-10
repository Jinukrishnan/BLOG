import { Router } from "express";
import * as authController from "../Controller/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const authRouter=Router();

authRouter.route("/register").post(authController.register);
authRouter.route("/login").post(authController.login);
authRouter.route("/getuser").get(authMiddleware,authController.getUsers);

export default authRouter;