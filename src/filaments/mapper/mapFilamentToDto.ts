import { FilamentDocument, FilamentDto } from "../types/types.js";

export const mapFilamentToDto = (filament: FilamentDocument): FilamentDto => {
  const capitalize = (word?: string): string => {
    if (!word) return "";

    return word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase();
  };

  return {
    id: filament._id.toString(),
    brand: capitalize(filament.brand),
    material: filament.material,
    colorHex: filament.color,
    diameter: filament.diameter,
    initialWeightGrams: filament.initialWeightGrams,
    currentWeightGrams: filament.currentWeightGrams,
    lowStockThresholdGrams: filament.lowStockThresholdGrams,
    isFavorite: filament.isFavorite,
    priceEurs: filament.priceEurs,
    supplier: capitalize(filament.supplier),
    purchaseUrl: filament.purchaseUrl,
    notes: capitalize(filament.notes),
    createdAt: filament.createdAt.toISOString(),
  };
};
