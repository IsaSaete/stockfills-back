import jwt from "jsonwebtoken";
import User from "../model/User.js";
import { IUserCreate } from "../types/types.js";
import statusCode from "../../utils/globals/globals.js";
import ServerError from "../../server/serverError/serverError.js";

export const registerUser = async (dataUser: IUserCreate) => {
  const existingUser = await User.findOne({ email: dataUser.email });

  if (existingUser) {
    throw new ServerError(statusCode.CONFLICT, "El usuario ya existe");
  }

  const newUser = await User.create(dataUser);

  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return {
    token,
    user: { id: newUser._id, email: newUser.email, name: newUser.name },
  };
};
