import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import connectToDatabase from "../../../database/connectToDatabase.js";
import User from "../../model/User.js";
import app from "../../../server/app.js";
import { fanflinsNewUser } from "../../fixtures/auth.fixtures.js";
import { AuthResponseBody, ResponseBodyError } from "../../types/types.js";
import statusCode from "../../../utils/globals/globals.js";

let server: MongoMemoryServer;

beforeAll(async () => {
  process.env.JWT_SECRET = "test_secret_key_for_jwt";

  server = await MongoMemoryServer.create();

  const mongoDbConnectionString = server.getUri();

  await connectToDatabase(mongoDbConnectionString);
});

afterAll(async () => {
  await mongoose.disconnect();

  await server.stop();
});

beforeEach(async () => {
  await User.deleteMany({});
});

describe("Given the POST/auth/register endpoint", () => {
  describe("When it receives a request with a 'Fanflins' data new user", () => {
    test("Then it should respond with a 201 status code and Fanflins data register", async () => {
      const expectedStatusCode = statusCode.CREATED;

      const response = await request(app)
        .post("/auth/register")
        .send(fanflinsNewUser);

      const body = response.body as AuthResponseBody;

      expect(response.status).toBe(expectedStatusCode);
      expect(body.user).toMatchObject({
        username: fanflinsNewUser.username,
        email: fanflinsNewUser.email,
      });
      expect(body.token).toBeDefined();
    });
  });

  describe("When it receives a request with a 'Fanflins' data and this user already exists", () => {
    test("Then it should respond with a 409 status code and 'El usuario ya existe'", async () => {
      const expectedStatus = statusCode.CONFLICT;
      const expectedErrorMessage = "El usuario ya existe";

      await User.create(fanflinsNewUser);

      const response = await request(app)
        .post("/auth/register")
        .send(fanflinsNewUser);

      const body = (await response).body as ResponseBodyError;

      expect(response.status).toBe(expectedStatus);
      expect(body.error).toBe(expectedErrorMessage);
    });
  });
});
