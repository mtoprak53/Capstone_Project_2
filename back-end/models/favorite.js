"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
// const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for favorites. */

class Favorite {
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
    const duplicateCheck = await db.query(
          `SELECT username, ${type}_id AS "${type}Id"
           FROM favorite_${type}s
           WHERE username = $1 AND ${type}_id = $2`,
        [username, favorite_id]);

    if (duplicateCheck.rows[0]) {
      const fav = await db.query(
            `SELECT name 
             FROM ${type === "cup" ? "league" : type}s 
             WHERE id = $1`,
          [favorite_id]
      );
      throw new BadRequestError(`Duplicate favorite ${type}: ${fav.rows[0].name}`);
    };

    const result = await db.query(
          `INSERT INTO favorite_${type}s
           (username, ${type}_id)
           VALUES ($1, $2)
           RETURNING username, ${type}_id AS "${type}Id"`,
        [username, favorite_id],
    );
    const newFav = result.rows[0];

    return newFav;
  }
  

  /** Find all favorites of specified type.
   *
   * Returns [{ username, id, name, country, flagUrl, logoUrl }, ...]
   * */

    static async findAll(username, type) {
      // console.log("**************************************/");
      const favsRes = await db.query(
        `SELECT username, 
                ${type}_id AS "id", 
                t.name AS "name", 
                t.country AS "country",
                t.logo_url AS "logoUrl",
                c.flag_url AS "flagUrl"
         FROM favorite_${type}s f
         JOIN ${type === "cup" ? "league" : type}s t
         ON t.id = ${type}_id
         JOIN countries c
         ON c.name = t.country
         WHERE username = $1`,
      [username]
      );
    return favsRes.rows;
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
           RETURNING username, ${type}_id AS "${type}Id"`,
        [username, favorite_id]);
    const favorite = result.rows[0];

    if (!favorite) {
      const fav = await db.query(
            `SELECT name 
             FROM ${type === "cup" ? "league" : type}s 
             WHERE id = $1`,
          [favorite_id]
      );
      throw new NotFoundError(
        `Deletion failed: ${fav.rows[0].name} ${type} is not in favorite list!`
      );
    }
  }
}


module.exports = Favorite;
