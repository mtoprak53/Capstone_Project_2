"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
// const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for favorites. */

class Favorite {
  /** Create a favorite (from data), update db, return new company data.
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
           (username, favorite_id)
           VALUES ($1, $2)
           RETURNING username, favorite_id"`,
        [username, favorite_id],
    );
    const newFav = result.rows[0];

    return newFav;
  }
  

  /** Find all favorites.
   *
   * Returns [{ username, name, description, numEmployees, logoUrl }, ...]
   * */

  static async findAll(username, type) {
    const favsRes = `SELECT username 
                          FROM favorite_${type}s
                          WHERE username = ${username}`;
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
      throw new NotFoundError(`No favorite ${type}: ${fav.rows[0].name}`);
    }
  }
}


module.exports = Favorite;
