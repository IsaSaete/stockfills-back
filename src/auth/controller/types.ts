import { NextFunction, Request, Response } from "express";

export interface AuthControllerStructure {
  registerUser: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<void>;
  loginUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
