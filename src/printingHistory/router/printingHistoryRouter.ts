import { Router } from "express";
import PrintingHistoryController from "../controller/PrintingHistoryController.js";
import { authMiddleware } from "../../middleware/authMiddleware/authMiddleware.js";
import uploadPrintingHistoryImageMiddleware from "../middleware/uploadPrintingHistoryImageMiddleware.js";

const printingHistoryRouter = Router();

const printingHistoryController = new PrintingHistoryController();

printingHistoryRouter.use(authMiddleware);

printingHistoryRouter.post(
  "/filaments/:filamentId/consume",
  printingHistoryController.consumeFilament,
);

printingHistoryRouter.get(
  "/",
  printingHistoryController.getPrintingHistoryByUserId,
);

printingHistoryRouter.patch(
  "/:printingHistoryId",
  printingHistoryController.updatePrintingHistoryById,
);

printingHistoryRouter.post(
  "/upload-image",
  uploadPrintingHistoryImageMiddleware.single("file"),
  printingHistoryController.uploadImage,
);

export default printingHistoryRouter;
