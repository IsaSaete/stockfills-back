import { NextFunction, Request, Response } from "express";
import {
  CreatePrintingHistoryDto,
  PrintingHistoryDto,
  UpdatePrintingHistoryDto,
} from "../types.js";

export interface PrintingHistoryControllerStructure {
  consumeFilament: (
    req: ConsumeFilamentRequest,
    res: ConsumeFilamentResponse,
    next: NextFunction,
  ) => Promise<void>;
  getPrintingHistoryByUserId: (
    req: PrintingHistoryRequest,
    res: PrintingHistoryResponse,
    next: NextFunction,
  ) => Promise<void>;
  updatePrintingHistoryById: (
    req: UpdatePrintingHistoryRequest,
    res: UpdatePrintingHistoryResponse,
    next: NextFunction,
  ) => Promise<void>;
  uploadImage: (
    req: UploadPrintingImageRequest,
    res: UploadPrintingImageResponse,
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

export type PrintingHistoryQuery = {
  page: string;
  limit: string;
};

export type PrintingHistoryPagination = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type PrintingHistoryRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  Record<string, unknown>,
  PrintingHistoryQuery
>;

export type PrintingHistoryBodyResponse = {
  printingEntries: PrintingHistoryDto[];
  pagination: PrintingHistoryPagination;
};

export type PrintingHistoryResponse = Response<PrintingHistoryBodyResponse>;

export type UpdatePrintingHistoryParams = { printingHistoryId: string };
export type UpdatePrintingHistoryRequest = Request<
  UpdatePrintingHistoryParams,
  Record<string, unknown>,
  { printingHistory: UpdatePrintingHistoryDto },
  Record<string, unknown>
>;
export type UpdatePrintingHistoryBodyResponse = {
  printingEntry: PrintingHistoryDto;
};
export type UpdatePrintingHistoryResponse =
  Response<UpdatePrintingHistoryBodyResponse>;

export type UploadPrintingImageBodyResponse = {
  imageUrl: string;
  imagePublicId: string;
};
export type UploadPrintingImageRequest = Request & {
  file?: Express.Multer.File;
};
export type UploadPrintingImageResponse =
  Response<UploadPrintingImageBodyResponse>;
