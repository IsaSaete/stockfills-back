import { FilamentDocument } from "../../filaments/types/types.js";
import {
  CreatePrintingHistoryDto,
  PrintingHistoryDocument,
  UpdatePrintingHistoryDto,
} from "../types.js";

export interface PrintingHistoryServiceStructure {
  consumeFilamentAndCreateHistory: (
    userId: string,
    filamentId: string,
    printingHistory: CreatePrintingHistoryDto,
  ) => Promise<ConsumeFilamentServiceResponse>;
  getPrintingHistoryByUserId: (
    userId: string,
    page: number,
    limit: number,
  ) => Promise<PrintingHistoryHistoryServiceResponse>;
  getPrintingHistoryById: (
    userId: string,
    printingHistoryId: string,
  ) => Promise<PrintingHistoryDocument>;
  updatePrintingHistoryById: (
    userId: string,
    printingHistoryId: string,
    updatePrintingHistoryDto: UpdatePrintingHistoryDto,
  ) => Promise<PrintingHistoryDocument>;
  uploadImage: (
    imageBuffer: Buffer,
    mimeType: string,
  ) => Promise<{ imageUrl: string; imagePublicId: string }>;
}

export interface ConsumeFilamentServiceResponse {
  printingEntry: PrintingHistoryDocument;
  filamentUpdated: FilamentDocument;
}

export interface PrintingHistoryHistoryServiceResponse {
  printingEntries: PrintingHistoryDocument[];
  pagination: {
    totalItems: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
