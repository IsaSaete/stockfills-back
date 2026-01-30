import jwt from "jsonwebtoken";
import User from "../model/User.js";
import { IUserCreate, UserLogin } from "../types/types.js";
import statusCode from "../../utils/globals/globals.js";
import ServerError from "../../server/serverError/serverError.js";

export const registerUser = async (dataUser: IUserCreate) => {
  const existingUser = await User.findOne({ email: dataUser.email });

  if (existingUser) {
    throw new ServerError(statusCode.CONFLICT, "El usuario ya existe");
  }

  const newUser = await User.create(dataUser);

  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  return {
    token,
    user: { id: newUser._id, email: newUser.email, username: newUser.username },
  };
};

export const loginUser = async (dataUser: UserLogin) => {
  const existingUser = await User.findOne({ email: dataUser.email }).select(
    "+password",
  );

  if (!existingUser) {
    throw new ServerError(statusCode.UNAUTHORIZED, "Credenciales inválidas");
  }

  const isValidPassword = await existingUser.comparePassword(dataUser.password);

  if (!isValidPassword) {
    throw new ServerError(statusCode.UNAUTHORIZED, "Credenciales inválidas");
  }

  const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return {
    token,
    user: {
      id: existingUser._id,
      email: existingUser.email,
      username: existingUser.username,
    },
  };
};
