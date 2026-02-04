import { FilamentDocument } from "../types/types.js";

export interface FilamentServiceStructure {
  getUserFilaments: (userId: string) => Promise<FilamentDocument[]>;
}
