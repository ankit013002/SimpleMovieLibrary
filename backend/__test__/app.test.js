const request = require("supertest");
const app = require("../src/app");

describe("Health check endpoint", () => {
  it("should return a 200 status code and healthy message", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toBe("Server is healthy");
  });
});
