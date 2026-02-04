import { FilamentDocument, FilamentDto } from "../types/types.js";

export const mapFilamentToDto = (filament: FilamentDocument): FilamentDto => ({
  id: filament._id.toString(),
  brand: filament.brand,
  material: filament.material,
  colorHex: filament.color,
  diameter: filament.diameter,
  initialWeightGrams: filament.initialWeightGrams,
  currentWeightGrams: filament.currentWeightGrams,
  lowStockThresholdGrams: filament.lowStockThresholdGrams,
  isFavorite: filament.isFavorite,
  priceEurs: filament.priceEurs,
  supplier: filament.supplier,
  purchaseUrl: filament.purchaseUrl,
  notes: filament.notes,
  createdAt: filament.createdAt.toISOString(),
});
