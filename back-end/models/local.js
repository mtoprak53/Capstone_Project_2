"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
// const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for favorites. */

class Local {
  /** Create a favorite (from data), update db, 
   * return new favorite league/team data.
   *
   * data should be { username, favorite_id }
   *
   * Returns { username, favorite_id }
   *
   * Throws BadRequestError if favorite already in database.
   * */

  static async create(username, favorite_id, type) {
    // const fav_id = `${db_name.slice(0, db_name.length-1)}_id`;
    const duplicateCheck = await db.query(
          // `SELECT username, ${fav_id}
          `SELECT username, ${type}_id
           FROM favorite_${type}s
           WHERE username = $1 AND ${type}_id = $2`,
        [username, favorite_id]);

    if (duplicateCheck.rows[0]) {
      const fav = await db.query(
            `SELECT name 
             FROM ${type}s 
             WHERE id = $1`,
          [favorite_id]
      );
      throw new BadRequestError(`Duplicate favorite ${type}: ${fav.rows[0].name}`);
    };

    const result = await db.query(
          `INSERT INTO favorite_${type}s
           (username, ${type}_id)
           VALUES ($1, $2)
           RETURNING username, ${type}_id`,
        [username, favorite_id],
    );
    const newFav = result.rows[0];

    return newFav;
  }
  

  /** Find all favorites.
   *
   * Returns [{ username, name, description, numEmployees, logoUrl }, ...]
   * */

  // static async findAll(username, type) {
  //   const favsRes = await db.query(
  //     `SELECT username, ${type}_id 
  //      FROM favorite_${type}s
  //      WHERE username = $1`,
  //   [username]
  //   );

  static async findAll(username, type) {
    const favsRes = await db.query(
      `SELECT username, 
              ${type}_id, 
              ${type}s.name AS ${type}_name, 
              ${type}s.country
        FROM favorite_${type}s
        JOIN ${type}s
        ON ${type}s.id = ${type}_id
        WHERE username = $1`,
    [username]
    );  

    // console.log(favsRes);
    return favsRes.rows;
  }
  

  /** Find all favorites.
   *
   * Returns [{ username, name, description, numEmployees, logoUrl }, ...]
   * */

  // static async findAll(username, type) {
  //   const favsRes = await db.query(
  //     `SELECT username, ${type}_id 
  //      FROM favorite_${type}s
  //      WHERE username = $1`,
  //   [username]
  //   );

  static async findCities(continent) {
    const res = await db.query(
      `SELECT city 
       FROM timezones
       WHERE continent = $1`,
    [continent]
    );

    console.log(res.rows);
    return res.rows;
  }

  static async getLeagueCountries() {
    const res = await db.query(
      `SELECT name, flag 
       FROM countries`
    );

    console.log(res.rows);
    return res.rows;
  }

  static async getCountrysLeagues(country) {
    const res = await db.query(
      `SELECT id, name, logo, type 
       FROM leagues
       WHERE country = $1`,
    [country]
    );

    console.log(res.rows);
    return res.rows;
  }

  static async getCupById(id) {
    const res = await db.query(
      `SELECT name, logo, country 
       FROM leagues
       WHERE id = $1`,
    [id]
    );

    // console.log(res);
    console.log(`local.js >> getCupById >> id: ${id}`);
    console.log(res.rows[0]);
    return res.rows[0];
  }


  /** Delete given favorite item from database; returns undefined.
   *
   * Throws NotFoundError if favorite item not found.
   **/

  static async remove(username, favorite_id, type) {
    const result = await db.query(
          `DELETE
           FROM favorite_${type}s
           WHERE username = $1 AND ${type}_id = $2
           RETURNING username, ${type}_id`,
        [username, favorite_id]);
    const favorite = result.rows[0];

    if (!favorite) {
      const fav = await db.query(
            `SELECT name 
             FROM ${type}s 
             WHERE id = $1`,
          [favorite_id]
      );
      throw new NotFoundError(
        `Deletion failed: ${fav.rows[0].name} ${type} is not in favorite list!`
      );
    }
  }
}


module.exports = Local;
