"use strict";

const db = require("../db.js");
const User = require("../models/user");
const Local = require("../models/local");
// const Job = require("../models/job");
const { createToken } = require("../helpers/tokens");

// const testJobIds = [];

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM teams");

  // await Company.create(
  //     {
  //       handle: "c1",
  //       name: "C1",
  //       numEmployees: 1,
  //       description: "Desc1",
  //       logoUrl: "http://c1.img",
  //     });
  // await Company.create(
  //     {
  //       handle: "c2",
  //       name: "C2",
  //       numEmployees: 2,
  //       description: "Desc2",
  //       logoUrl: "http://c2.img",
  //     });
  // await Company.create(
  //     {
  //       handle: "c3",
  //       name: "C3",
  //       numEmployees: 3,
  //       description: "Desc3",
  //       logoUrl: "http://c3.img",
  //     });

  // testJobIds[0] = (await Job.create(
  //     { title: "J1", salary: 1, equity: "0.1", companyHandle: "c1" })).id;
  // testJobIds[1] = (await Job.create(
  //     { title: "J2", salary: 2, equity: "0.2", companyHandle: "c1" })).id;
  // testJobIds[2] = (await Job.create(
  //     { title: "J3", salary: 3, /* equity null */ companyHandle: "c1" })).id;

  await User.register({
    username: "u1",
    email: "user1@user.com",
    password: "password1",
    continent: "Europe",
    city: "Athens",
    isAdmin: false,
  });
  await User.register({
    username: "u2",
    email: "user2@user.com",
    password: "password2",
    continent: "Europe",
    city: "Berlin",
    isAdmin: false,
  });
  await User.register({
    username: "u3",
    email: "user3@user.com",
    password: "password3",
    continent: "Europe",
    city: "Paris",
    isAdmin: false,
  });

  await Local.addTeam({
    id: 549, 
    name: "Beşiktaş", 
    code: "BJK", 
    country: "Türkiye", 
    founded: 1903, 
    national: false, 
    logoUrl: "https://media.api-sports.io/football/teams/549.png", 
    venueId: 1578
  });
  // await Local.addTeam({
  //   id: 994, 
  //   name: "Göztepe", 
  //   code: "GÖZ", 
  //   country: "Türkiye", 
  //   founded: 1925, 
  //   national: false, 
  //   logoUrl: "https://media.api-sports.io/football/teams/994.png", 
  //   venueId: 1583
  // });
  // await Local.addTeam({
  //   id: 13378, 
  //   name: "Çengelköyspor", 
  //   code: null, 
  //   country: "Türkiye", 
  //   founded: 1980, 
  //   national: false, 
  //   logoUrl: "https://media.api-sports.io/football/teams/13378.png", 
  //   venueId: 8389
  // });

  // await User.applyToJob("u1", testJobIds[0]);
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}


const u1Token = createToken({ username: "u1", isAdmin: false });
const u2Token = createToken({ username: "u2", isAdmin: false });
const adminToken = createToken({ username: "admin", isAdmin: true });


module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  // testJobIds,
  u1Token,
  u2Token,
  adminToken,
};
