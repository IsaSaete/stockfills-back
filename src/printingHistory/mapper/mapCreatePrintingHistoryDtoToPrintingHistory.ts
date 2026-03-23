import { CreatePrintingHistoryDto, PrintingHistory } from "../types.js";

export const mapCreatePrintingHistoryDtoToPrintingHistory = (
  createPrintingHistoryDto: CreatePrintingHistoryDto,
): PrintingHistory => {
  return {
    pieceName: createPrintingHistoryDto.pieceName || undefined,
    imageUrl: undefined,
    gramsConsumed: createPrintingHistoryDto.gramsConsumed,
    notes: createPrintingHistoryDto.notes || undefined,
    costPerPiece: undefined,
    isDeleted: false,
  };
};
