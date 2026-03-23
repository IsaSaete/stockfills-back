import { FilamentDocument } from "../../filaments/types/types.js";
import { CreatePrintingHistoryDto, PrintingHistoryDocument } from "../types.js";

export interface PrintingHistoryServiceStructure {
  consumeFilamentAndCreateHistory: (
    userId: string,
    filamentId: string,
    printingHistory: CreatePrintingHistoryDto,
  ) => Promise<ConsumeFilamentServiceResponse>;
}

export interface ConsumeFilamentServiceResponse {
  printingEntry: PrintingHistoryDocument;
  filamentUpdated: FilamentDocument;
}
