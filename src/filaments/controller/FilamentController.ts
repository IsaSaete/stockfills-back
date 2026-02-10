import { Request, NextFunction } from "express";
import {
  FilamentsControllerStructure,
  FilamentRequest,
  FilamentResponse,
  FilamentsResponse,
} from "./types.js";
import { FilamentService } from "../service/FilamentService.js";
import statusCode from "../../utils/globals/globals.js";
import { mapFilamentToDto } from "../mapper/mapFilamentToDto.js";
import { mapCreateFilamenDtoToFilament } from "../mapper/mapCreateFilamenDtoToFilament.js";
import { validateCreateFilamentDto } from "../validators/validateCreateFilamentDto.js";

const filamentService = new FilamentService();

class FilamentController implements FilamentsControllerStructure {
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

  public createNewFilament = async (
    req: FilamentRequest,
    res: FilamentResponse,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const createFilamentDto = req.body.filament;

      validateCreateFilamentDto(createFilamentDto);

      const filamentToCreate = mapCreateFilamenDtoToFilament(createFilamentDto);

      const createdFilament = await filamentService.createNewFilament(
        req.user!.userId,
        filamentToCreate,
      );

      const filamentDto = mapFilamentToDto(createdFilament);

      res.status(statusCode.CREATED).json({ filament: filamentDto });
    } catch (error) {
      next(error);
    }
  };
}

export default FilamentController;
