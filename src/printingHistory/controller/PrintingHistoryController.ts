import { NextFunction } from "express";
import { PrintingHistoryService } from "../service/PrintingHistoryService.js";
import { validateCreatePrintingHistoryDto } from "../validator/validateCreatePrintingHistoryDto.js";
import {
  ConsumeFilamentRequest,
  ConsumeFilamentResponse,
  PrintingHistoryControllerStructure,
  PrintingHistoryRequest,
  PrintingHistoryResponse,
  UpdatePrintingHistoryRequest,
  UpdatePrintingHistoryResponse,
  UploadPrintingImageRequest,
  UploadPrintingImageResponse,
} from "./types.js";
import statusCode from "../../utils/globals/globals.js";
import { mapPrintingHistoryToDtoWithFilament } from "../mapper/mapPrintingHistoryToDtoWithFilament.js";
import { mapPrintingHistoryDocumentsToDtos } from "../mapper/mapPrintingHistoryDocumentToDto.js";
import { validatePrintingHistoryQuery } from "../validator/validatePrintingHistoryQuery.js";
import { validateUpdatePrintingHistoryDto } from "../validator/validateUpdatePrintingHistoryDto.js";
import ServerError from "../../server/serverError/serverError.js";

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

  public updatePrintingHistoryById = async (
    req: UpdatePrintingHistoryRequest,
    res: UpdatePrintingHistoryResponse,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const updatePrintingHistoryDto = req.body.printingHistory;

      validateUpdatePrintingHistoryDto(updatePrintingHistoryDto);

      const printingHistory =
        await printingHistoryService.updatePrintingHistoryById(
          req.user!.userId,
          req.params.printingHistoryId,
          updatePrintingHistoryDto,
        );

      const printingHistoryDto = mapPrintingHistoryDocumentsToDtos([
        printingHistory,
      ])[0];

      res.status(statusCode.OK).json({
        printingEntry: printingHistoryDto,
      });
    } catch (error) {
      next(error);
    }
  };

  public uploadImage = async (
    req: UploadPrintingImageRequest,
    res: UploadPrintingImageResponse,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const imageFile = req.file;

      if (!imageFile) {
        throw new ServerError(
          statusCode.BAD_REQUEST,
          "No se ha enviado imagen",
        );
      }

      const { imageUrl, imagePublicId } =
        await printingHistoryService.uploadImage(
          imageFile.buffer,
          imageFile.mimetype,
        );

      res.status(statusCode.CREATED).json({ imageUrl, imagePublicId });
    } catch (error) {
      next(error);
    }
  };
}

export default PrintingHistoryController;
