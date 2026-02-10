import { Router } from "express";
import FilamentController from "../controller/FilamentController.js";
import { authMiddleware } from "../../middleware/authMiddleware/authMiddleware.js";

const filamentRouter = Router();

const filamentController = new FilamentController();

filamentRouter.use(authMiddleware);

filamentRouter.get("/", filamentController.getUserFilaments);

filamentRouter.post("/", filamentController.createNewFilament);

export default filamentRouter;
