import { model, Schema } from "mongoose";
import { FilamentStructure } from "../types/types.js";

const filamentSchema = new Schema<FilamentStructure>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    brand: { type: String, required: true },
    material: {
      type: String,
      enum: ["PLA", "PETG", "ABS", "TPU", "NYLON", "PLA_WOOD", "OTHER"],
      required: true,
    },
    color: { type: String, required: true },
    diameter: { type: Number, enum: [1.75, 2.85], default: 1.75 },
    initialWeightGrams: { type: Number, required: true, min: 1 },
    currentWeightGrams: { type: Number, required: true, min: 0 },
    lowStockThresholdGrams: { type: Number, required: true, min: 0 },
    priceEurs: { type: Number, min: 0 },
    supplier: { type: String },
    purchaseUrl: { type: String },
    notes: { type: String },
    isFavorite: { type: Boolean, default: false },
    referenceCode: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Filament = model<FilamentStructure>("Filament", filamentSchema);
