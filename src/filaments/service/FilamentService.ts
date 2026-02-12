import { Types } from "mongoose";
import { Filament, FilamentDocument } from "../types/types.js";
import { FilamentServiceStructure } from "./types.js";
import { FilamentModel } from "../model/Filament.js";

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
}
