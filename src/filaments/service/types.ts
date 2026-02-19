import { Filament, FilamentDocument } from "../types/types.js";

export interface FilamentServiceStructure {
  getUserFilaments: (userId: string) => Promise<FilamentDocument[]>;
  createNewFilament: (
    userId: string,
    newFilament: Filament,
  ) => Promise<FilamentDocument>;
  toggleFavorite: (
    userId: string,
    filamentId: string,
  ) => Promise<FilamentDocument>;
  getFilamentById: (
    userId: string,
    filamentId: string,
  ) => Promise<FilamentDocument>;
}
