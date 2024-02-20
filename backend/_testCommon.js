"use strict";

const db = require("./db");

async function commonBeforeAll() {
  // await db.query("DELETE FROM users");
  // await db.query("DELETE FROM teams");
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

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
};
