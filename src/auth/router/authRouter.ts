import { Router } from "express";
import AuthController from "../controller/AuthController.js";

const authRouter = Router();

const authController = new AuthController();

authRouter.post("/register", authController.registerUser);

export default authRouter;
