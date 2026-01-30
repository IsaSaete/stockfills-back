import { FilamentStructure } from "../types/types.js";

export interface FilamentServiceStructure {
  getUserFilaments: (userId: string) => Promise<FilamentStructure[]>;
}
