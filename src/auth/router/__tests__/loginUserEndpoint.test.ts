import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import connectToDatabase from "../../../database/connectToDatabase.js";
import User from "../../model/User.js";
import app from "../../../server/app.js";
import {
  fanflinsLoginData,
  fanflinsNewUser,
} from "../../fixtures/auth.fixtures.js";
import { AuthResponseBody, ResponseBodyError } from "../../types/types.js";
import statusCode from "../../../utils/globals/globals.js";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();

  const mongoDbConnectionString = server.getUri();

  await connectToDatabase(mongoDbConnectionString);
});

afterAll(async () => {
  await mongoose.disconnect();

  await server.stop();
});

beforeEach(async () => {
  process.env.JWT_SECRET = "test_secret_key_for_jwt";

  await User.deleteMany({});
});

describe("Given the POST /auth/login endpoint", () => {
  describe("When it receives valid credentials for an existing user", () => {
    test("Then it should respond with 200 and token + user data", async () => {
      await User.create(fanflinsNewUser);

      const response = await request(app)
        .post("/auth/login")
        .send(fanflinsLoginData);

      const body = response.body as AuthResponseBody;

      expect(response.status).toBe(statusCode.OK);
      expect(body.user).toMatchObject({
        email: fanflinsNewUser.email,
        username: fanflinsNewUser.username,
      });
      expect(body.token).toBeDefined();
    });
  });

  describe("When it receives credentials for a non-existent user", () => {
    test("Then it should respond with 401 and error message", async () => {
      const response = await request(app)
        .post("/auth/login")
        .send(fanflinsNewUser);

      const body = response.body as ResponseBodyError;

      expect(response.status).toBe(statusCode.UNAUTHORIZED);
      expect(body.error).toBe("Credenciales inválidas");
    });
  });

  describe("When it receives an error credentials ", () => {
    test("Then it should respond with 401 and error message", async () => {
      await User.create(fanflinsNewUser);

      const response = await request(app)
        .post("/auth/login")
        .send({ email: fanflinsLoginData.email, password: "123783" });

      const body = response.body as ResponseBodyError;

      expect(response.status).toBe(statusCode.UNAUTHORIZED);
      expect(body.error).toBe("Credenciales inválidas");
    });
  });
});
