import multer from "multer";
import { Request } from "express";
import ServerError from "../../server/serverError/serverError.js";
import statusCode from "../../utils/globals/globals.js";

const allowedImageMimeTypes = ["image/jpeg", "image/png", "image/webp"];
const maxImageSizeInBytes = 5 * 1024 * 1024;

const uploadPrintingHistoryImageMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: maxImageSizeInBytes },
  fileFilter: (
    _req: Request,
    file: Express.Multer.File,
    callback: multer.FileFilterCallback,
  ) => {
    if (!allowedImageMimeTypes.includes(file.mimetype)) {
      callback(
        new ServerError(
          statusCode.BAD_REQUEST,
          "Solo se permiten imágenes JPG, PNG o WEBP",
        ),
      );

      return;
    }

    callback(null, true);
  },
});

export default uploadPrintingHistoryImageMiddleware;
