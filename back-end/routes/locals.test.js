"use strict";

const request = require("supertest");

const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  // testJobIds,
  u1Token,
  adminToken,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /companies */

describe("POST /locals/team", function () {
  const newTeam = {
    id: 999999, 
    name: "Atanalirspor", 
    code: "AAS", 
    country: "Malta", 
    founded: 1909, 
    national: false, 
    logoUrl: "https:pic.com/abc.png", 
    venueId: 999999,
  };

  test("ok for admin", async function () {
    const resp = await request(app)
        .post("/locals/team")
        .send(newTeam)
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({ team: newTeam });
  });

  test("ok for non-admin", async function () {
    const resp = await request(app)
        .post("/locals/team")
        .send(newTeam)
        .set("authorization", `Bearer ${u1Token}`);
        expect(resp.statusCode).toEqual(201);
        expect(resp.body).toEqual({ team: newTeam });
  });

  test("bad request with missing data", async function () {
    const resp = await request(app)
        .post("/locals/team")
        .send({
          id: 999999, 
          name: "Atanalirspor", 
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request with invalid data", async function () {
    const resp = await request(app)
        .post("/locals/team")
        .send({
          ...newTeam,
          logoUrl: "not-a-url",
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });
});

