import { Types } from "mongoose";

export type FilamentMaterial =
  | "PLA"
  | "PETG"
  | "ABS"
  | "TPU"
  | "NYLON"
  | "PLA_WOOD"
  | "OTHER";

export type FilamentDiameter = 1.75 | 2.85;

export interface FilamentStructure {
  userId: Types.ObjectId;
  brand: string;
  material: FilamentMaterial;
  color: string;
  diameter: FilamentDiameter;
  initialWeightGrams: number;
  currentWeightGrams: number;
  lowStockThresholdGrams: number;
  priceEurs?: number;
  supplier?: string;
  purchaseUrl?: string;
  notes?: string;
  isFavorite: boolean;
  referenceCode?: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
