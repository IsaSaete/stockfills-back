import { FilamentDocument } from "../../filaments/types/types.js";
import { CreatePrintingHistoryDto, PrintingHistoryDocument } from "../types.js";

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
