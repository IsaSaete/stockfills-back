import { model, Schema } from "mongoose";
import { PrintingHistoryDocument } from "../types.js";

const printingHistorySchema = new Schema<PrintingHistoryDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    filamentId: {
      type: Schema.Types.ObjectId,
      ref: "Filament",
      required: true,
    },
    gramsConsumed: {
      type: Number,
      required: true,
      min: 0.1,
    },

    pieceName: {
      type: String,
      default: null,
      trim: true,
    },

    costPerPiece: {
      type: Number,
      default: null,
      min: 0,
    },
    filamentAtPrint: {
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
      customMaterial: { type: String, default: null },
      colorHex: { type: String, required: true },
      diameter: { type: Number, enum: [1.75, 2.85], required: true },
      priceEurs: { type: Number, min: 0, default: null },
    },
    notes: {
      type: String,
      default: null,
    },
    imageUrl: {
      type: String,
      default: null,
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const PrintingHistory = model<PrintingHistoryDocument>(
  "PrintingHistory",
  printingHistorySchema,
);

export default PrintingHistory;
