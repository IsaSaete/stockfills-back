import ServerError from "../../server/serverError/serverError.js";
import statusCode from "../../utils/globals/globals.js";
import { PrintingHistoryStatus, UpdatePrintingHistoryDto } from "../types.js";

const validStatus: PrintingHistoryStatus[] = ["PENDING", "COMPLETED", "FAILED"];

export const validateUpdatePrintingHistoryDto = (
  updatePrintingHistoryDto: UpdatePrintingHistoryDto,
): void => {
  const maxPieceNameLength = 120;
  const maxNotesLength = 1000;

  if (Object.keys(updatePrintingHistoryDto).length === 0) {
    throw new ServerError(
      statusCode.BAD_REQUEST,
      "No se han enviado campos para actualizar",
    );
  }

  if (
    updatePrintingHistoryDto.pieceName !== undefined &&
    updatePrintingHistoryDto.pieceName.length > maxPieceNameLength
  ) {
    throw new ServerError(
      statusCode.BAD_REQUEST,
      `pieceName must be ${maxPieceNameLength} characters or less`,
    );
  }

  if (
    updatePrintingHistoryDto.notes !== undefined &&
    updatePrintingHistoryDto.notes.length > maxNotesLength
  ) {
    throw new ServerError(
      statusCode.BAD_REQUEST,
      `notes must be ${maxNotesLength} characters or less`,
    );
  }

  if (
    updatePrintingHistoryDto.status !== undefined &&
    !validStatus.includes(updatePrintingHistoryDto.status)
  ) {
    throw new ServerError(
      statusCode.BAD_REQUEST,
      "Estado de impresión no válido",
    );
  }

  if (updatePrintingHistoryDto.imageUrl !== undefined) {
    const trimmedImageUrl = updatePrintingHistoryDto.imageUrl.trim();
    const isValidHttpUrl =
      trimmedImageUrl.startsWith("http://") ||
      trimmedImageUrl.startsWith("https://");

    if (trimmedImageUrl !== "" && !isValidHttpUrl) {
      throw new ServerError(
        statusCode.BAD_REQUEST,
        "La imagen debe ser una URL válida",
      );
    }
  }

  if (updatePrintingHistoryDto.imagePublicId !== undefined) {
    const trimmedImagePublicId = updatePrintingHistoryDto.imagePublicId.trim();

    if (
      trimmedImagePublicId !== "" &&
      updatePrintingHistoryDto.imageUrl === undefined
    ) {
      throw new ServerError(
        statusCode.BAD_REQUEST,
        "No se puede enviar imagePublicId sin imageUrl",
      );
    }
  }
};
