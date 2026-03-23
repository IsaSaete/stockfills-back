import { FilamentDocument } from "../../filaments/types/types.js";
import { PrintingHistoryDocument, PrintingHistoryDto } from "../types.js";

export const mapPrintingHistoryToDtoWithFilament = (
  printingHistory: PrintingHistoryDocument,
  filament: FilamentDocument,
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
      id: filament._id.toString(),
      brand: filament.brand,
      material: filament.material,
      customMaterial: filament.customMaterial,
      colorHex: filament.color,
      diameter: filament.diameter,
    },
  };
};
