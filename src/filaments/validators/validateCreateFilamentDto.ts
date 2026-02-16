import ServerError from "../../server/serverError/serverError.js";
import statusCode from "../../utils/globals/globals.js";
import { CreateFilamentDTo } from "../types/types.js";

export const validateCreateFilamentDto = (
  createFilamentDto: CreateFilamentDTo,
): void => {
  if (!createFilamentDto.brand.trim()) {
    throw new ServerError(statusCode.BAD_REQUEST, "Brand is required");
  }

  if (!createFilamentDto.material.trim()) {
    throw new ServerError(statusCode.BAD_REQUEST, "Material is required");
  }

  if (
    createFilamentDto.material === "OTHER" &&
    (!createFilamentDto.customMaterial ||
      createFilamentDto.customMaterial.trim().length === 0)
  ) {
    throw new ServerError(
      statusCode.BAD_REQUEST,
      "Custom material is required when material is OTHER",
    );
  }

  if (!createFilamentDto.color.trim()) {
    throw new ServerError(statusCode.BAD_REQUEST, "Color is required");
  }

  if (createFilamentDto.initialWeightGrams <= 0) {
    throw new ServerError(
      statusCode.BAD_REQUEST,
      "Initial weight must be greater than 0",
    );
  }

  if (
    createFilamentDto.priceEurs !== undefined &&
    createFilamentDto.priceEurs < 0
  ) {
    throw new ServerError(statusCode.BAD_REQUEST, "Price cannot be negative");
  }
};
