import { NextFunction, Request, Response } from "express";
import { CreatePrintingHistoryDto, PrintingHistoryDto } from "../types.js";

export interface PrintingHistoryControllerStructure {
  consumeFilament: (
    req: ConsumeFilamentRequest,
    res: ConsumeFilamentResponse,
    next: NextFunction,
  ) => Promise<void>;
}

export type ConsumeFilamentResponse = Response<ConsumeFilamentBodyResponse>;
export type ConsumeFilamentBodyResponse = {
  printingEntry: PrintingHistoryDto;
};

export type ConsumeFilamentParams = { filamentId: string };
export type ConsumeFilamentRequest = Request<
  ConsumeFilamentParams,
  Record<string, unknown>,
  { printingHistory: CreatePrintingHistoryDto },
  Record<string, unknown>
>;
