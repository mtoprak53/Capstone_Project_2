"use strict";

const {
  // NotFoundError,
  BadRequestError,
  // UnauthorizedError,
} = require("../expressError");
const db = require("../db.js");
const Local = require("./local.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testJobIds,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** addTeam */

describe("addTeam", function () {
  const newTeam = {
    id: 999999, 
    name: "Atanalirspor", 
    code: "AAS", 
    country: "Malta", 
    founded: 1909, 
    national: false, 
    logoUrl: "https:pic.com/abc.png", 
    venueId: 999999
  };

  test("works", async function () {
    const team = await Local.addTeam(newTeam);
    expect(team).toEqual(newTeam);
  });

  test("no duplicate", async function () {
    try {
      await Local.addTeam(newTeam);
      await Local.addTeam(newTeam);
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});
