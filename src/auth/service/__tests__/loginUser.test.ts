import jwt from "jsonwebtoken";
import User from "../../model/User.js";

import {
  fanflinsUserRegistered,
  fanflinsNewUser,
} from "../../fixtures/auth.fixtures.js";
import ServerError from "../../../server/serverError/serverError.js";
import statusCode from "../../../utils/globals/globals.js";
import { loginUser } from "../AuthService.js";

jest.mock("../../model/User");
jest.mock("jsonwebtoken");

describe("Given the loginUser service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = "test_secret_key_for_jwt";
  });

  describe("When it receives valid credentials and the user exists", () => {
    test("Then it should return token and user data", async () => {
      const mockFindOne = {
        select: jest.fn().mockReturnThis(),
      };

      (User.findOne as jest.Mock).mockReturnValue(mockFindOne);

      mockFindOne.select.mockResolvedValue({
        ...fanflinsUserRegistered,
        comparePassword: jest.fn().mockResolvedValue(true),
      });

      (jwt.sign as jest.Mock).mockReturnValue("fake-token");

      const loggedUser = await loginUser(fanflinsNewUser);

      expect(loggedUser.user).toMatchObject({
        id: fanflinsUserRegistered._id,
        email: fanflinsUserRegistered.email,
        username: fanflinsUserRegistered.username,
      });
      expect(loggedUser.token).toBe("fake-token");
    });
  });

  describe("When it receives credentials for a non-existent user", () => {
    test("Then it should throw a 401 ServerError", async () => {
      const mockSelect = jest.fn().mockResolvedValue(null);

      (User.findOne as jest.Mock).mockReturnValue({
        select: mockSelect,
      });

      await expect(loginUser(fanflinsNewUser)).rejects.toThrow(ServerError);
      await expect(loginUser(fanflinsNewUser)).rejects.toMatchObject({
        statusCode: statusCode.UNAUTHORIZED,
        message: "Credenciales inválidas",
      });
    });
  });

  describe("When it receives wrong password for an existing user", () => {
    test("Then it should throw a 401 ServerError", async () => {
      const mockComparePassword = jest.fn().mockResolvedValue(false);
      const mockSelect = jest.fn().mockResolvedValue({
        ...fanflinsUserRegistered,
        comparePassword: mockComparePassword,
      });

      (User.findOne as jest.Mock).mockReturnValue({
        select: mockSelect,
      });

      await expect(loginUser(fanflinsNewUser)).rejects.toThrow(ServerError);
      await expect(loginUser(fanflinsNewUser)).rejects.toMatchObject({
        statusCode: statusCode.UNAUTHORIZED,
        message: "Credenciales inválidas",
      });
    });
  });
});
