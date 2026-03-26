import { NextFunction } from "express";
import { PrintingHistoryService } from "../service/PrintingHistoryService.js";
import { validateCreatePrintingHistoryDto } from "../validator/validateCreatePrintingHistoryDto.js";
import {
  ConsumeFilamentRequest,
  ConsumeFilamentResponse,
  PrintingHistoryControllerStructure,
  PrintingHistoryRequest,
  PrintingHistoryResponse,
} from "./types.js";
import statusCode from "../../utils/globals/globals.js";
import { mapPrintingHistoryToDtoWithFilament } from "../mapper/mapPrintingHistoryToDtoWithFilament.js";
import { mapPrintingHistoryDocumentsToDtos } from "../mapper/mapPrintingHistoryDocumentToDto.js";
import { validatePrintingHistoryQuery } from "../validator/validatePrintingHistoryQuery.js";

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

  public getPrintingHistoryByUserId = async (
    req: PrintingHistoryRequest,
    res: PrintingHistoryResponse,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = req.user!.userId;
      const { page, limit } = validatePrintingHistoryQuery(req.query);

      const historyPage =
        await printingHistoryService.getPrintingHistoryByUserId(
          userId,
          page,
          limit,
        );

      const items = mapPrintingHistoryDocumentsToDtos(
        historyPage.printingEntries,
      );

      res.status(statusCode.OK).json({
        printingEntries: items,
        pagination: historyPage.pagination,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default PrintingHistoryController;
