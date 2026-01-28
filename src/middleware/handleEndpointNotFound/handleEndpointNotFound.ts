import { NextFunction, Request, Response } from "express";
import ServerError from "../../server/serverError/serverError.js";
import statusCode from "../../utils/globals/globals.js";

const handleEndpointNotFound = (
  _req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const error = new ServerError(statusCode.NOT_FOUND, "Endpoint not found");

  next(error);
};

export default handleEndpointNotFound;
