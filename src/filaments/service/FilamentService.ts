import { Types } from "mongoose";
import { Filament } from "../model/Filament.js";
import { FilamentStructure } from "../types/types.js";
import { FilamentServiceStructure } from "./types.js";

export class FilamentService implements FilamentServiceStructure {
  public getUserFilaments = async (
    userId: string,
  ): Promise<FilamentStructure[]> => {
    return Filament.find({
      userId: new Types.ObjectId(userId),
      isDeleted: false,
    });
  };
}
