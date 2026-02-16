import { model, Schema } from "mongoose";
import { FilamentDocument } from "../types/types.js";

const filamentSchema = new Schema<FilamentDocument>(
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
      enum: [
        "PLA",
        "ABS",
        "ASA",
        "PETG",
        "TPU",
        "PET",
        "NYLON",
        "PLA_WOOD",
        "FLEXIBLE",
        "OTHER",
      ],
      required: true,
    },
    customMaterial: {
      type: String,
      required: function (this: FilamentDocument) {
        return this.material === "OTHER";
      },
      validate: {
        validator: function (this: FilamentDocument, value: string) {
          if (this.material === "OTHER") {
            return Boolean(value && value.trim().length > 0);
          }
          return true;
        },
        message: "Custom material must be provided when material is OTHER",
      },
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
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

filamentSchema.pre("validate", function (next) {
  if (this.material !== "OTHER") {
    this.customMaterial = undefined;
  }
  next();
});

export const FilamentModel = model<FilamentDocument>(
  "Filament",
  filamentSchema,
);
