import { Router } from "express";
import * as authController from "../Controller/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const authRouter=Router();

authRouter.route("/register").post(authController.register);
authRouter.route("/login").post(authController.login);
authRouter.route("/getuser").get(authMiddleware,authController.getUsers);
authRouter.route("/posts").post(authMiddleware,authController.addPost).get(authMiddleware,authController.getPosts);
authRouter.route("/posts/:id").delete(authMiddleware,authController.deletePost);
authRouter.route("/user").get(authMiddleware,authController.getMe);

export default authRouter;