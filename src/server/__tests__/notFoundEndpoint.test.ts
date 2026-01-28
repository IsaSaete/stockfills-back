import statusCode from "../../utils/globals/globals.js";
import request from "supertest";
import app from "../app.js";

describe("Given a GET /fils non existent endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should show a respons with 404 status code and an 'Endpoint not found' error", async () => {
      const expectedStatus = statusCode.NOT_FOUND;
      const expectedErrorMessage = "Endpoint not found";

      const response = await request(app).get("/Manga");

      const body = response.body as { error: string };

      expect(response.status).toBe(expectedStatus);
      expect(body.error).toBe(expectedErrorMessage);
    });
  });
});
