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
    notes: {
      type: String,
      default: null,
    },
    imageUrl: {
      type: String,
      default: null,
    },
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
