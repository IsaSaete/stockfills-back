import { Types } from "mongoose";
import { Filament, FilamentDocument } from "../types/types.js";
import { FilamentServiceStructure } from "./types.js";
import { FilamentModel } from "../model/Filament.js";
import ServerError from "../../server/serverError/serverError.js";
import statusCode from "../../utils/globals/globals.js";

export class FilamentService implements FilamentServiceStructure {
  public getUserFilaments = async (
    userId: string,
  ): Promise<FilamentDocument[]> => {
    return FilamentModel.find({
      userId: new Types.ObjectId(userId),
      isDeleted: false,
    });
  };

  public createNewFilament = async (
    userId: string,
    newFilament: Filament,
  ): Promise<FilamentDocument> => {
    return FilamentModel.create({
      ...newFilament,
      userId,
    });
  };

  public toggleFavorite = async (
    userId: string,
    filamentId: string,
  ): Promise<FilamentDocument> => {
    const filament = await FilamentModel.findById(filamentId);

    if (!filament) {
      throw new ServerError(statusCode.NOT_FOUND, "Filamento no encontrado");
    }

    if (filament.userId.toString() !== userId) {
      throw new ServerError(
        statusCode.UNAUTHORIZED,
        "No tienes permiso para modificar este filamento",
      );
    }

    filament.isFavorite = !filament.isFavorite;

    const updatedFilament = await filament.save();

    return updatedFilament;
  };

  public getFilamentById = async (
    userId: string,
    filamentId: string,
  ): Promise<FilamentDocument> => {
    const filament = await FilamentModel.findById(filamentId);

    if (!filament) {
      throw new ServerError(statusCode.NOT_FOUND, "Filamento no encontrado");
    }

    if (filament.userId.toString() !== userId) {
      throw new ServerError(
        statusCode.UNAUTHORIZED,
        "No tienes permiso para modificar este filamento",
      );
    }

    return filament;
  };
}
