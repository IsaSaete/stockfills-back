import { Types, Document } from "mongoose";

export type FilamentMaterial =
  | "PLA"
  | "ABS"
  | "ASA"
  | "PETG"
  | "TPU"
  | "PET"
  | "NYLON"
  | "PLA_WOOD"
  | "FLEXIBLE"
  | "OTHER";

export type FilamentDiameter = 1.75 | 2.85;

export interface Filament {
  brand: string;
  material: FilamentMaterial;
  customMaterial?: string;
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
  isDeleted: boolean;
}

export interface FilamentDocument extends Filament, Document {
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
export interface FilamentDto {
  id: string;
  brand: string;
  material: FilamentMaterial;
  customMaterial?: string;
  colorHex: string;
  diameter: FilamentDiameter;
  initialWeightGrams: number;
  currentWeightGrams: number;
  lowStockThresholdGrams: number;
  priceEurs?: number;
  supplier?: string;
  purchaseUrl?: string;
  notes?: string;
  isFavorite: boolean;
  createdAt: string;
}

export interface CreateFilamentDTo {
  brand: string;
  material: FilamentMaterial;
  customMaterial?: string;
  color: string;
  diameter: FilamentDiameter;
  initialWeightGrams: number;
  priceEurs?: number;
  supplier?: string;
  purchaseUrl?: string;
  notes?: string;
  isFavorite: boolean;
}
