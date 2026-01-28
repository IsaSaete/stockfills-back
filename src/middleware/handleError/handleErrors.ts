import createDebug from "debug";
import ServerError from "../../server/serverError/serverError.js";
import { NextFunction, Request, Response } from "express";
import statusCode from "../../utils/globals/globals.js";

const debug = createDebug(process.env.DEBUG || "stockfils:server:error");

const handleErrors = (
  error: ServerError,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void => {
  debug("Error", error.message);

  res.status(error.statusCode ?? statusCode.INTERNAL_SERVER_ERROR).json({
    error:
      error instanceof ServerError ? error.message : "Internal server error",
  });
};

export default handleErrors;
