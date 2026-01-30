import { Request, Response, NextFunction } from "express";
import { FilamentStructure } from "../types/types.js";

export interface FilamensControllerStructure {
  getUserFilaments: (
    req: Request,
    res: FilamentsResponse,
    next: NextFunction,
  ) => Promise<void>;
}

export type FilamentsResponse = Response<FilamentsBodyResponse>;

export type FilamentsBodyResponse = { filaments: FilamentStructure[] };
