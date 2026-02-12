import { Request, Response, NextFunction } from "express";
import { CreateFilamentDTo, FilamentDto } from "../types/types.js";

export interface FilamentsControllerStructure {
  getUserFilaments: (
    req: Request,
    res: FilamentsResponse,
    next: NextFunction,
  ) => Promise<void>;
  createNewFilament: (
    req: FilamentRequest,
    res: FilamentResponse,
    next: NextFunction,
  ) => Promise<void>;
  toggleFavorite: (
    req: FilamentRequest,
    res: FilamentResponse,
    next: NextFunction,
  ) => Promise<void>;
}

export type FilamentsResponse = Response<FilamentsBodyResponse>;

export type FilamentsBodyResponse = { filaments: FilamentDto[] };

export type FilamentResponse = Response<FilamentBodyResponse>;

export type FilamentBodyResponse = { filament: FilamentDto };

export type FilamentParams = { filamentId: string };

export type FilamentRequest = Request<
  FilamentParams,
  Record<string, unknown>,
  FilamentBody,
  Record<string, unknown>
>;

export type FilamentBody = { filament: CreateFilamentDTo };
