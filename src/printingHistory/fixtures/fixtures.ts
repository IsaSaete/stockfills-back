// import { Types } from "mongoose";
// import { FilamentDocument } from "../../filaments/types/types.js";
// import {
//   CreatePrintingHistoryDto,
//   PrintingHistoryDocument,
//   PrintingHistoryDto,
// } from "../types.js";

// export const TEST_IDS = {
//   filamentId: new Types.ObjectId("507f1f77bcf86cd799439011"),
//   userId: new Types.ObjectId("607f1f77bcf86cd799439012"),
//   printingHistoryId: new Types.ObjectId("707f1f77bcf86cd799439013"),
// } as const;

// export const testFilament: FilamentDocument = {
//   _id: TEST_IDS.filamentId,
//   userId: TEST_IDS.userId,
//   brand: "Smartfill",
//   material: "PLA",
//   customMaterial: undefined,
//   color: "#0000FF",
//   diameter: 1.75,
//   initialWeightGrams: 1000,
//   currentWeightGrams: 850,
//   lowStockThresholdGrams: 200,
//   priceEurs: 25,
//   supplier: "Amazon",
//   purchaseUrl: "https://amazon.es/...",
//   notes: "Filamento de prueba",
//   isFavorite: false,
//   isDeleted: false,
//   createdAt: new Date("2025-03-10"),
//   updatedAt: new Date("2025-03-10"),
//   save: jest.fn().mockResolvedValue(this),
// } as unknown as FilamentDocument;

// export const testFilamentNoPriceEurs: FilamentDocument = {
//   ...testFilament,
//   priceEurs: undefined,
// } as unknown as FilamentDocument;

// export const testFilamentLowStock: FilamentDocument = {
//   ...testFilament,
//   currentWeightGrams: 100,
// } as unknown as FilamentDocument;

// export const validConsumeFilamentRequest: CreatePrintingHistoryDto = {
//   gramsConsumed: 150,
//   pieceName: "Soporte Articulado V2",
//   notes: "Impresión perfecta",
// };

// export const minimalConsumeFilamentRequest: CreatePrintingHistoryDto = {
//   gramsConsumed: 50,
// };

// export const invalidConsumeFilamentRequestNegativeGrams: CreatePrintingHistoryDto =
//   {
//     gramsConsumed: -50,
//     pieceName: "Test",
//   };

// export const invalidConsumeFilamentRequestZeroGrams: CreatePrintingHistoryDto =
//   {
//     gramsConsumed: 0,
//     pieceName: "Test",
//   };

// export const invalidConsumeFilamentRequestExcessiveGrams: CreatePrintingHistoryDto =
//   {
//     gramsConsumed: 1000,
//     pieceName: "Test",
//   };

// export const createdPrintingHistoryDocument: PrintingHistoryDocument = {
//   _id: TEST_IDS.printingHistoryId,
//   userId: TEST_IDS.userId,
//   filamentId: TEST_IDS.filamentId,
//   gramsConsumed: 150,
//   pieceName: "Soporte Articulado V2",
//   costPerPiece: 3.75,
//   notes: "Impresión perfecta",
//   imageUrl: undefined,
//   isDeleted: false,
//   createdAt: new Date("2025-03-10T10:00:00Z"),
//   updatedAt: new Date("2025-03-10T10:00:00Z"),
//   save: jest.fn().mockResolvedValue(this),
// } as unknown as PrintingHistoryDocument;

// export const createdPrintingHistoryDto: PrintingHistoryDto = {
//   id: TEST_IDS.printingHistoryId.toString(),
//   gramsConsumed: 150,
//   pieceName: "Soporte Articulado V2",
//   costPerPiece: 3.75,
//   notes: "Impresión perfecta",
//   imageUrl: undefined,
//   createdAt: "2025-03-10T10:00:00.000Z",
//   filament: {
//     id: TEST_IDS.filamentId.toString(),
//     brand: "Smartfill",
//     material: "PLA",
//     colorHex: "#0000FF",
//     diameter: 1.75,
//   },
// };

// export const testToken =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDdmMWY3N2JjZjg2Y2Q3OTk0MzkwMTIiLCJpYXQiOjE2NDY5MzI4MDB9.test";

// export const testUser = {
//   userId: TEST_IDS.userId.toString(),
// };
