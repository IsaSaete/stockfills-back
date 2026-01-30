import jwt from "jsonwebtoken";
import {
  fanflinsNewUser,
  fanflinsUserRegistered,
} from "../../fixtures/auth.fixtures.js";
import { registerUser } from "../AuthService.js";
import User from "../../model/User.js";
import ServerError from "../../../server/serverError/serverError.js";
import statusCode from "../../../utils/globals/globals.js";

jest.mock("../../model/User");
jest.mock("jsonwebtoken");

describe("Given the registerUser service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = "test_secret_key_for_jwt";
  });

  describe("When it receives 'Fanflins' DATA AND THE USER NOT EXISTS", () => {
    test("Then it should create user and return token + user data", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);
      (User.create as jest.Mock).mockResolvedValue(fanflinsUserRegistered);
      (jwt.sign as jest.Mock).mockReturnValue("fake-token");

      const registeredUser = await registerUser(fanflinsNewUser);

      expect(registeredUser.user).toMatchObject({
        id: fanflinsUserRegistered._id,
        email: fanflinsUserRegistered.email,
        username: fanflinsUserRegistered.username,
      });
    });
  });

  describe("When it receives 'Fanflins' and user already exists", () => {
    test("Then it should throw a 409 SercerError", async () => {
      const expectedError = new ServerError(
        statusCode.CONFLICT,
        "El usuario ya existe",
      );

      (User.findOne as jest.Mock).mockResolvedValue({
        email: fanflinsNewUser.email,
      });

      const registeredUser = registerUser(fanflinsNewUser);

      await expect(registeredUser).rejects.toThrow(expectedError);
    });
  });
});
