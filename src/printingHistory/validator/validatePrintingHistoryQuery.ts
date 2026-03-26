import ServerError from "../../server/serverError/serverError.js";
import statusCode from "../../utils/globals/globals.js";
import { PrintingHistoryQuery } from "../controller/types.js";

export const validatePrintingHistoryQuery = (
  query: PrintingHistoryQuery,
): { page: number; limit: number } => {
  const page = query.page === undefined ? 1 : Number(query.page);
  const limit = query.limit === undefined ? 10 : Number(query.limit);

  const maxLimit = 50;

  if (!Number.isInteger(page)) {
    throw new ServerError(
      statusCode.BAD_REQUEST,
      "Page number must be integer",
    );
  }

  if (!Number.isInteger(limit)) {
    throw new ServerError(statusCode.BAD_REQUEST, "Limit must be integer");
  }

  if (page <= 0) {
    throw new ServerError(
      statusCode.BAD_REQUEST,
      "Page must be greater than 0",
    );
  }

  if (limit <= 0) {
    throw new ServerError(
      statusCode.BAD_REQUEST,
      "Limit must be greater than 0",
    );
  }

  if (limit > maxLimit) {
    throw new ServerError(statusCode.BAD_REQUEST, "Limit must be at most 50");
  }

  return { page, limit };
};
