import { Router } from "express";
import PrintingHistoryController from "../controller/PrintingHistoryController.js";
import { authMiddleware } from "../../middleware/authMiddleware/authMiddleware.js";

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

export default printingHistoryRouter;
