import mongoose from "mongoose";
import { FilamentModel } from "../../filaments/model/Filament.js";
import ServerError from "../../server/serverError/serverError.js";
import statusCode from "../../utils/globals/globals.js";
import PrintingHistory from "../model/PrintingHistory.js";
import {
  CreatePrintingHistoryDto,
  PrintingHistoryDocument,
  UpdatePrintingHistoryDto,
} from "../types.js";
import {
  ConsumeFilamentServiceResponse,
  PrintingHistoryHistoryServiceResponse,
  PrintingHistoryServiceStructure,
} from "./types.js";
import { FilamentDocument } from "../../filaments/types/types.js";
import cloudinary from "./cloudinaryClient.js";

export class PrintingHistoryService implements PrintingHistoryServiceStructure {
  public consumeFilamentAndCreateHistory = async (
    userId: string,
    filamentId: string,
    printingHistory: CreatePrintingHistoryDto,
  ): Promise<ConsumeFilamentServiceResponse> => {
    const session = await mongoose.startSession();

    try {
      let filamentUpdatedResponse: FilamentDocument | null = null;
      let createdPrintingHistoryResponse: PrintingHistoryDocument | null = null;

      await session.withTransaction(async () => {
        const filament =
          await FilamentModel.findById(filamentId).session(session);

        if (!filament) {
          throw new ServerError(
            statusCode.NOT_FOUND,
            "Filamento no encontrado",
          );
        }

        if (filament.userId.toString() !== userId) {
          throw new ServerError(
            statusCode.UNAUTHORIZED,
            "No tienes permiso para consumir este filamento",
          );
        }

        if (filament.currentWeightGrams < printingHistory.gramsConsumed) {
          throw new ServerError(
            statusCode.BAD_REQUEST,
            `Filamento insuficiente. Disponible ${filament.currentWeightGrams} g`,
          );
        }

        filament.currentWeightGrams -= printingHistory.gramsConsumed;
        const filamentUpdated = await filament.save({ session });

        let costPerPiece: number | undefined;
        if (filament.priceEurs !== undefined) {
          costPerPiece =
            printingHistory.gramsConsumed * (filament.priceEurs / 1000);
        }

        const printingHistoryToCreate = {
          pieceName: printingHistory.pieceName || undefined,
          gramsConsumed: printingHistory.gramsConsumed,
          status: "PENDING" as const,
          notes: printingHistory.notes || undefined,
          imageUrl: undefined,
          imagePublicId: undefined,
          isDeleted: false,
          userId: new mongoose.Types.ObjectId(userId),
          filamentId: new mongoose.Types.ObjectId(filamentId),
          costPerPiece,
          filamentAtPrint: {
            brand: filament.brand,
            material: filament.material,
            customMaterial: filament.customMaterial,
            colorHex: filament.color,
            diameter: filament.diameter,
            priceEurs: filament.priceEurs,
          },
        };

        const [createdPrintingHistory] = await PrintingHistory.create(
          [printingHistoryToCreate],
          { session },
        );

        filamentUpdatedResponse = filamentUpdated;
        createdPrintingHistoryResponse = createdPrintingHistory;
      });

      if (!filamentUpdatedResponse || !createdPrintingHistoryResponse) {
        throw new ServerError(
          statusCode.INTERNAL_SERVER_ERROR,
          "No se pudo registrar el historial de impresión",
        );
      }

      return {
        printingEntry: createdPrintingHistoryResponse,
        filamentUpdated: filamentUpdatedResponse,
      };
    } finally {
      await session.endSession();
    }
  };

  public getPrintingHistoryByUserId = async (
    userId: string,
    page: number,
    limit: number,
  ): Promise<PrintingHistoryHistoryServiceResponse> => {
    const filter = {
      userId: new mongoose.Types.ObjectId(userId),
      isDeleted: false,
    };

    const totalItems = await PrintingHistory.countDocuments(filter);

    const items = await PrintingHistory.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec();

    const totalPages = Math.ceil(totalItems / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      printingEntries: items,
      pagination: {
        totalItems,
        page,
        limit,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      },
    };
  };

  public updatePrintingHistoryById = async (
    userId: string,
    printingHistoryId: string,
    updatePrintingHistoryDto: UpdatePrintingHistoryDto,
  ): Promise<PrintingHistoryDocument> => {
    const printingHistory = await PrintingHistory.findOne({
      _id: printingHistoryId,
      userId: new mongoose.Types.ObjectId(userId),
      isDeleted: false,
    });

    if (!printingHistory) {
      throw new ServerError(
        statusCode.NOT_FOUND,
        "Registro de impresión no encontrado",
      );
    }

    if (updatePrintingHistoryDto.pieceName !== undefined) {
      printingHistory.pieceName =
        updatePrintingHistoryDto.pieceName.trim() || undefined;
    }

    if (updatePrintingHistoryDto.status !== undefined) {
      printingHistory.status = updatePrintingHistoryDto.status;
    }

    if (updatePrintingHistoryDto.notes !== undefined) {
      printingHistory.notes =
        updatePrintingHistoryDto.notes.trim() || undefined;
    }

    if (updatePrintingHistoryDto.imageUrl !== undefined) {
      const newImageUrl = updatePrintingHistoryDto.imageUrl.trim() || undefined;
      const newImagePublicId =
        updatePrintingHistoryDto.imagePublicId?.trim() || undefined;
      const currentImagePublicId = printingHistory.imagePublicId;

      if (currentImagePublicId && currentImagePublicId !== newImagePublicId) {
        await this.deleteImageByPublicId(currentImagePublicId);
      }

      printingHistory.imageUrl = newImageUrl;
      printingHistory.imagePublicId = newImagePublicId;
    }

    await printingHistory.save();

    return printingHistory;
  };

  public uploadImage = async (
    imageBuffer: Buffer,
    mimeType: string,
  ): Promise<{ imageUrl: string; imagePublicId: string }> => {
    const dataUri = `data:${mimeType};base64,${imageBuffer.toString("base64")}`;

    const uploadResponse = await cloudinary.uploader.upload(dataUri, {
      folder: "stockfils/history",
      resource_type: "image",
    });

    return {
      imageUrl: uploadResponse.secure_url,
      imagePublicId: uploadResponse.public_id,
    };
  };

  private deleteImageByPublicId = async (
    imagePublicId: string,
  ): Promise<void> => {
    await cloudinary.uploader.destroy(imagePublicId, {
      resource_type: "image",
    });
  };
}
