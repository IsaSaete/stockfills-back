import mongoose from "mongoose";
import { FilamentModel } from "../../filaments/model/Filament.js";
import ServerError from "../../server/serverError/serverError.js";
import statusCode from "../../utils/globals/globals.js";
import PrintingHistory from "../model/PrintingHistory.js";
import { CreatePrintingHistoryDto } from "../types.js";
import {
  ConsumeFilamentServiceResponse,
  PrintingHistoryServiceStructure,
} from "./types.js";

export class PrintingHistoryService implements PrintingHistoryServiceStructure {
  public consumeFilamentAndCreateHistory = async (
    userId: string,
    filamentId: string,
    printingHistory: CreatePrintingHistoryDto,
  ): Promise<ConsumeFilamentServiceResponse> => {
    const session = await mongoose.startSession();

    try {
      let filamentUpdatedResponse = null;
      let createdPrintingHistoryResponse = null;

      await session.withTransaction(async () => {
        const filament =
          await FilamentModel.findById(filamentId).session(session);

        if (!filament) {
          throw new ServerError(
            statusCode.NOT_FOUND,
            "Filamento no encontrado",
          );
        }

        if (filament.userId.toString() !== userId) {
          throw new ServerError(
            statusCode.UNAUTHORIZED,
            "No tienes permiso para consumir este filamento",
          );
        }

        if (filament.currentWeightGrams < printingHistory.gramsConsumed) {
          throw new ServerError(
            statusCode.BAD_REQUEST,
            `Filamento insuficiente. Disponible ${filament.currentWeightGrams} g`,
          );
        }

        filament.currentWeightGrams -= printingHistory.gramsConsumed;
        const filamentUpdated = await filament.save({ session });

        let costPerPiece: number | undefined;

        if (filament.priceEurs) {
          costPerPiece =
            printingHistory.gramsConsumed * (filament.priceEurs / 1000);
        }

        const [createdPrintingHistory] = await PrintingHistory.create(
          [
            {
              pieceName: printingHistory.pieceName || undefined,
              gramsConsumed: printingHistory.gramsConsumed,
              notes: printingHistory.notes || undefined,
              imageUrl: undefined,
              isDeleted: false,
              userId: new mongoose.Types.ObjectId(userId),
              filamentId: new mongoose.Types.ObjectId(filamentId),
              costPerPiece,
              filamentAtPrint: {
                brand: filament.brand,
                material: filament.material,
                customMaterial: filament.customMaterial,
                colorHex: filament.color,
                diameter: filament.diameter,
                priceEurs: filament.priceEurs,
              },
            },
          ],
          { session },
        );

        filamentUpdatedResponse = filamentUpdated;
        createdPrintingHistoryResponse = createdPrintingHistory;
      });

      if (!filamentUpdatedResponse || !createdPrintingHistoryResponse) {
        throw new ServerError(
          statusCode.INTERNAL_SERVER_ERROR,
          "No se pudo registrar el historial de impresión",
        );
      }

      return {
        printingEntry: createdPrintingHistoryResponse,
        filamentUpdated: filamentUpdatedResponse,
      };
    } finally {
      await session.endSession();
    }
  };
}
