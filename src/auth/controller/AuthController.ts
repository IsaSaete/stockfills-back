import { Request, Response, NextFunction } from "express";
import { AuthControllerStructure } from "./types.js";
import * as authService from "../service/AuthService.js";
import statusCode from "../../utils/globals/globals.js";

class AuthController implements AuthControllerStructure {
  public registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const user = await authService.registerUser(req.body);

      res.status(statusCode.CREATED).json(user);
    } catch (error) {
      next(error);
    }
  };

  public loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const user = await authService.loginUser(req.body);

      res.status(statusCode.OK).json(user);
    } catch (error) {
      next(error);
    }
  };
}
export default AuthController;
