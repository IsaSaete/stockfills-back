import { PrintingHistoryDocument, PrintingHistoryDto } from "../types.js";

export const mapPrintingHistoryDocumentToDto = (
  printingHistory: PrintingHistoryDocument,
): PrintingHistoryDto => {
  return {
    id: printingHistory._id.toString(),
    pieceName: printingHistory.pieceName,
    gramsConsumed: printingHistory.gramsConsumed,
    costPerPiece: printingHistory.costPerPiece,
    notes: printingHistory.notes,
    imageUrl: printingHistory.imageUrl,
    createdAt: printingHistory.createdAt.toISOString(),
    filament: {
      id: printingHistory.filamentId.toString(),
      brand: printingHistory.filamentAtPrint.brand,
      material: printingHistory.filamentAtPrint.material,
      customMaterial: printingHistory.filamentAtPrint.customMaterial,
      colorHex: printingHistory.filamentAtPrint.colorHex,
      diameter: printingHistory.filamentAtPrint.diameter,
      priceEurs: printingHistory.filamentAtPrint.priceEurs,
    },
  };
};

export const mapPrintingHistoryDocumentsToDtos = (
  documents: PrintingHistoryDocument[],
): PrintingHistoryDto[] => {
  const printingHistoryDtos = documents.map((document) =>
    mapPrintingHistoryDocumentToDto(document),
  );

  return printingHistoryDtos;
};
