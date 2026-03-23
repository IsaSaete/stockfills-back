import { NextFunction } from "express";
import { PrintingHistoryService } from "../service/PrintingHistoryService.js";
import { validateCreatePrintingHistoryDto } from "../validator/validateCreatePrintingHistoryDto.js";
import {
  ConsumeFilamentRequest,
  ConsumeFilamentResponse,
  PrintingHistoryControllerStructure,
} from "./types.js";
import statusCode from "../../utils/globals/globals.js";
import { mapPrintingHistoryToDtoWithFilament } from "../mapper/mapPrintingHistoryToDtoWithFilament.js";

const printingHistoryService = new PrintingHistoryService();

class PrintingHistoryController implements PrintingHistoryControllerStructure {
  public consumeFilament = async (
    req: ConsumeFilamentRequest,
    res: ConsumeFilamentResponse,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const createPrintingHistoryDto = req.body.printingHistory;

      validateCreatePrintingHistoryDto(createPrintingHistoryDto);

      const { filamentUpdated, printingEntry } =
        await printingHistoryService.consumeFilamentAndCreateHistory(
          req.user!.userId,
          req.params.filamentId,
          createPrintingHistoryDto,
        );

      const printingHistoryDto = mapPrintingHistoryToDtoWithFilament(
        printingEntry,
        filamentUpdated,
      );

      res.status(statusCode.CREATED).json({
        printingEntry: printingHistoryDto,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default PrintingHistoryController;
