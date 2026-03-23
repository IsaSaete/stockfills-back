import { Document, Types } from "mongoose";
import {
  FilamentDiameter,
  FilamentMaterial,
} from "../filaments/types/types.js";

export interface PrintingHistory {
  pieceName?: string;
  gramsConsumed: number;
  costPerPiece?: number;
  filamentAtPrint: {
    brand: string;
    material: FilamentMaterial;
    customMaterial?: string;
    colorHex: string;
    diameter: FilamentDiameter;
    priceEurs?: number;
  };
  notes?: string;
  imageUrl?: string;
  isDeleted: boolean;
}

export interface PrintingHistoryDocument extends PrintingHistory, Document {
  userId: Types.ObjectId;
  filamentId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface PrintingHistoryDto {
  id: string;
  pieceName?: string;
  gramsConsumed: number;
  costPerPiece?: number;
  notes?: string;
  imageUrl?: string;
  createdAt: string;
  filament: {
    id: string;
    brand: string;
    material: FilamentMaterial;
    customMaterial?: string;
    colorHex: string;
    diameter: FilamentDiameter;
    priceEurs?: number;
  };
}

export interface CreatePrintingHistoryDto {
  gramsConsumed: number;
  pieceName?: string;
  notes?: string;
}
