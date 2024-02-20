"use strict";

const db = require("../db");
const { BadRequestError } = require("../expressError");

/** Related functions for favorites. */

class Local {

  /** TODO: ADD COMMENT */

  static async addTeam({ id, name, code, country, founded, national, logoUrl, venueId }) {
    const duplicateCheck = await db.query(
        `SELECT id
         FROM teams 
         WHERE id=$1`, 
      [id]
    );

    if (duplicateCheck.rows[0]) 
      throw new BadRequestError(`Duplicate team: ${name}`);

    const result = await db.query(
          `INSERT INTO teams 
          (id, name, code, country, founded, national, logo_url, venue_id) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
          RETURNING id, name, code, country, founded, national, logo_url AS "logoUrl", venue_id AS "venueId"`,
        [id, name, code, country, founded, national, logoUrl, venueId]
    );
    const team = result.rows[0];

    return team;
  }


  /** TODO: ADD COMMENT */

  static async findCities(continent) {
    const res = await db.query(
      `SELECT city 
       FROM timezones
       WHERE continent = $1`,
    [continent]
    );
    return res.rows;
  }


  /** TODO: ADD COMMENT */

  static async getLeagueCountries() {
    const res = await db.query(
      `SELECT name, flag_url AS "flagUrl" 
       FROM countries`
    );
    return res.rows;
  }


  /** TODO: ADD COMMENT */

  static async getTeam(id) {
    console.log(`local.js >> getTeam >> id: ${id}`);
    const res = await db.query(
      `SELECT id, name
       FROM teams
       WHERE id = $1`,
    [id]
    );
    return res.rows[0];
  }


  /** TODO: ADD COMMENT */

  static async getCountrysLeagues(country) {
    const res = await db.query(
      `SELECT id, name, logo_url, type 
       FROM leagues
       WHERE country = $1`,
    [country]
    );
    return res.rows;
  }


  /** TODO: ADD COMMENT */

  static async getCupById(id) {
    console.log(`local.js >> getCupById >> id: ${id}`);
    const res = await db.query(
      `SELECT name, logo_url, country 
       FROM leagues
       WHERE id = $1`,
    [id]
    );
    return res.rows[0];
  }

}


module.exports = Local;
