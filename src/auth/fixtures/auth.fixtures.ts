import { IUserCreate, UserLogin } from "../types/types.js";

export const fanflinsNewUser: IUserCreate = {
  email: "fanflins@gtest.com",
  password: "123456",
  username: "fanflins",
};

export const fanflinsUserRegistered = {
  _id: "123456789012345678901234",
  email: "fanflins@gtest.com",
  password: "123456",
  username: "fanflins",
};

export const fanflinsLoginData: UserLogin = {
  email: "fanflins@gtest.com",
  password: "123456",
};
