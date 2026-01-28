import { Request, Response, NextFunction } from "express";
import { AuthControllerStructure } from "./types.js";
import * as authService from "../service/AuthService.js";

class AuthController implements AuthControllerStructure {
  public registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const user = await authService.registerUser(req.body);

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  };
}
export default AuthController;
