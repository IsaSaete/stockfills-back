import { FilamentDocument } from "../../filaments/types/types.js";
import { PrintingHistoryDocument, PrintingHistoryDto } from "../types.js";

export const mapPrintingHistoryToDtoWithFilament = (
  printingHistory: PrintingHistoryDocument,
  filament: FilamentDocument,
): PrintingHistoryDto => {
  const filamentAtPrint = printingHistory.filamentAtPrint;

  return {
    id: printingHistory._id.toString(),
    pieceName: printingHistory.pieceName,
    gramsConsumed: printingHistory.gramsConsumed,
    costPerPiece: printingHistory.costPerPiece,
    status: printingHistory.status ?? "PENDING",
    notes: printingHistory.notes,
    imageUrl: printingHistory.imageUrl,
    imagePublicId: printingHistory.imagePublicId,
    createdAt: printingHistory.createdAt.toISOString(),
    filament: {
      id: filament._id.toString(),
      brand: filamentAtPrint.brand,
      material: filamentAtPrint.material,
      customMaterial: filamentAtPrint.customMaterial,
      colorHex: filamentAtPrint.colorHex,
      diameter: filamentAtPrint.diameter,
      priceEurs: filamentAtPrint.priceEurs,
    },
  };
};
