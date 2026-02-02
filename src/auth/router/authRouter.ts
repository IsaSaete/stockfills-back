import { Router } from "express";
import AuthController from "../controller/AuthController.js";
import { authMiddleware } from "../../middleware/authMiddleware/authMiddleware.js";

const authRouter = Router();

const authController = new AuthController();

authRouter.post("/register", authController.registerUser);

authRouter.post("/login", authController.loginUser);

authRouter.get("/verify", authMiddleware, authController.verifyToken);

export default authRouter;
