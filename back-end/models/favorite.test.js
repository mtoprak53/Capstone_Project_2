"use strict";

// const {
//   NotFoundError,
//   BadRequestError,
//   UnauthorizedError,
// } = require("../expressError");
const db = require("../db.js");
const Favorite = require("./favorite.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);


/************************************** create */

describe("create", function () {
  test("works for teams", async function () {
    const res = await Favorite.create("u1", 777, "team");
    expect(res).toEqual({
      username: "u1",
      teamId: 777
    });
  });

  test("works for leagues", async function () {
    const res = await Favorite.create("u2", 203, "league");
    expect(res).toEqual({
      username: "u2",
      leagueId: 203
    });
  });

  test("works for cups", async function () {
    const res = await Favorite.create("u1", 66, "cup");
    expect(res).toEqual({
      username: "u1",
      cupId: 66
    });
  });
});


/************************************** findAll */

describe("findAll", function () {
  test("works for teams", async function () {
    const res = await Favorite.findAll("u1", "team");
    expect(res[0].username).toBe("u1");
    expect(res[0].id).toBe(165);
  });

  test("works for leagues", async function () {
    const res = await Favorite.findAll("u2", "league");
    expect(res[0].username).toBe("u2");
    expect(res[0].id).toBe(140);
  });

  test("works for cups", async function () {
    const res = await Favorite.findAll("u1", "cup");
    expect(res[0].username).toBe("u1");
    expect(res[0].id).toBe(206);
  });

});


/************************************** remove */

describe("remove", function () {
  test("works for teams", async function () {
    await Favorite.remove("u1", 165, "team");
    const res = await Favorite.findAll("u1", "team");
    expect(res.length).toEqual(0);
  });

  test("works for leagues", async function () {
    await Favorite.remove("u2", 140, "league");
    const res = await Favorite.findAll("u2", "league");
    expect(res.length).toEqual(0);
  });

  test("works for cups", async function () {
    await Favorite.remove("u1", 206, "cup");
    const res = await Favorite.findAll("u1", "cup");
    expect(res.length).toEqual(0);
  });

});
