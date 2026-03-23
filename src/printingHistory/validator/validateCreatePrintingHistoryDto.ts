import ServerError from "../../server/serverError/serverError.js";
import statusCode from "../../utils/globals/globals.js";
import { CreatePrintingHistoryDto } from "../types.js";

export const validateCreatePrintingHistoryDto = (
  createPrintingHistoryDto: CreatePrintingHistoryDto,
): void => {
  const maxPieceNameLength = 120;
  const maxNotesLength = 1000;

  if (createPrintingHistoryDto.gramsConsumed <= 0) {
    throw new ServerError(
      statusCode.BAD_REQUEST,
      "Grams consumed must be greater than 0",
    );
  }

  if (
    createPrintingHistoryDto.pieceName &&
    createPrintingHistoryDto.pieceName.length > maxPieceNameLength
  ) {
    throw new ServerError(
      statusCode.BAD_REQUEST,
      `pieceName must be ${maxPieceNameLength} characters or less`,
    );
  }

  if (
    createPrintingHistoryDto.notes &&
    createPrintingHistoryDto.notes.length > maxNotesLength
  ) {
    throw new ServerError(
      statusCode.BAD_REQUEST,
      `notes must be ${maxNotesLength} characters or less`,
    );
  }
};
