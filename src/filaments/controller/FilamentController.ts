import { Request, NextFunction } from "express";
import { FilamensControllerStructure, FilamentsResponse } from "./types.js";
import { FilamentService } from "../service/FilamentService.js";
import statusCode from "../../utils/globals/globals.js";
import { mapFilamentToDto } from "../mapper/filamentMapper.js";

const filamentService = new FilamentService();

class FilamentController implements FilamensControllerStructure {
  public getUserFilaments = async (
    req: Request,
    res: FilamentsResponse,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = req.user!.userId;
      const filaments = await filamentService.getUserFilaments(userId);

      const filamentsDto = filaments.map(mapFilamentToDto);

      res.status(statusCode.OK).json({ filaments: filamentsDto });
    } catch (error) {
      next(error);
    }
  };
}

export default FilamentController;
