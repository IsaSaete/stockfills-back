import { CreateFilamentDTo, Filament } from "../types/types.js";

export const mapCreateFilamenDtoToFilament = (
  createFilamentDto: CreateFilamentDTo,
): Filament => {
  return {
    brand: createFilamentDto.brand,
    material: createFilamentDto.material,
    color: createFilamentDto.color,
    diameter: createFilamentDto.diameter,
    initialWeightGrams: createFilamentDto.initialWeightGrams,
    currentWeightGrams: createFilamentDto.initialWeightGrams,
    lowStockThresholdGrams: 200,
    priceEurs: createFilamentDto.priceEurs,
    supplier: createFilamentDto.supplier,
    purchaseUrl: createFilamentDto.purchaseUrl,
    notes: createFilamentDto.notes,
    isFavorite: createFilamentDto.isFavorite,
    isDeleted: false,
  };
};
