import ServerError from "../../server/serverError/serverError.js";
import statusCode from "../../utils/globals/globals.js";
import { CreatePrintingHistoryDto } from "../types.js";

export const validateCreatePrintingHistoryDto = (
  createPrintingHistoryDto: CreatePrintingHistoryDto,
): void => {
  if (createPrintingHistoryDto.gramsConsumed <= 0) {
    throw new ServerError(
      statusCode.BAD_REQUEST,
      "Grams consumed must be greater than 0",
    );
  }
};
