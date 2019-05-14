const mongoose = require("mongoose");
// eslint-disable-next-line import/no-extraneous-dependencies
const request = require("supertest");

const loginTrainer = require("../../server/database/queries/login-trainer");

const Trainer = require("../../server/database/models/Trainer");
const dbConnection = require("../../server/database/db_connection");

const buildDb = require("../../server/database/dummy_data_build");

const app = require("../../server/app");

dbConnection();

beforeEach(async () => {
  await buildDb().catch(err => console.log(err));
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Test for /dashboard route", () => {
  // test if loginTrainer successfully creates token
  test("test if trainer login creates token", async () => {
    const result = await loginTrainer("johndoe@gmail.com", "123456", null);
    expect(result.success).toBe(true);
    expect(result.token).toBeDefined();
  });

  test("test if token passes the passport authentication", async () => {
    const token = await loginTrainer("johndoe@gmail.com", "123456", null);
    // console.log("TOKEN!!!!!!!!", token)

    const response = await request(app)
      .get("/dashboard")
      .set({ Authorization: token.token });

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.firstName).toEqual("John");
  });

  test("test if token fails the passport authentication", async () => {
    const response = await request(app)
      .get("/dashboard")
      .set({ Authorization: "wrong token" });

    expect(response.status).toBe(401);
    expect(response.text).toEqual("Unauthorized");
  });
});
