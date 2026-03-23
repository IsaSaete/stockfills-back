import { Types } from "mongoose";
import { FilamentModel } from "../../filaments/model/Filament.js";
import { mapCreatePrintingHistoryDtoToPrintingHistory } from "../mapper/mapCreatePrintingHistoryDtoToPrintingHistory.js";
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
    const filament = await FilamentModel.findById(filamentId);

    if (!filament) {
      throw new ServerError(statusCode.NOT_FOUND, "Filamento no encontrado");
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
    const filamentUpdated = await filament.save();

    let costPerPiece: number | undefined;

    if (filament.priceEurs) {
      costPerPiece =
        printingHistory.gramsConsumed * (filament.priceEurs / 1000);
    }

    const printingHistoryToCreate =
      mapCreatePrintingHistoryDtoToPrintingHistory(printingHistory);

    const createdPrintingHistory = await PrintingHistory.create({
      ...printingHistoryToCreate,
      userId: new Types.ObjectId(userId),
      filamentId: new Types.ObjectId(filamentId),
      costPerPiece,
    });

    return {
      printingEntry: createdPrintingHistory,
      filamentUpdated,
    };
  };
}
