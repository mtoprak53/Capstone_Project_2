"use strict";

/** Routes for favorites. */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureCorrectUserOrAdmin } = require("../middleware/auth");
const Local = require("../models/local");

const favoriteNewSchema = require("../schemas/favoriteNew.json");

const router = new express.Router();


/** POST / { favorite } =>  { favorite }
 *
 * favorite should be { username, favorite_id, type }
 *
 * Returns { username, favorite_id, type }
 *
 * Authorization required: admin
 */

router.post("/", ensureCorrectUserOrAdmin, async function (req, res, next) {
  console.log(req.body);
  try {
    const validator = jsonschema.validate(req.body, favoriteNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const { username, favorite_id, type } = req.body;
    const favorite = await Favorite.create(username, favorite_id, type);
    // return res.status(201).json({ favorite });
    return res.status(201).json({ favorite });
  } catch (err) {
    return next(err);
  }
});


/** GET /  =>
 *   { favorite: [ { username, favorite_id, type }, ...] }
 * *
 * Authorization required: none
 */

// router.get("/:username/:type", ensureCorrectUserOrAdmin, async function (req, res, next) {
//   try {
//     const { username, type } = req.params;
//     const favorites = await Favorite.findAll(username, type);
//     return res.json({ favorites });
//   } catch (err) {
//     return next(err);
//   }
// });


/** GET /  =>
 *   { favorite: [ { username, favorite_id, type }, ...] }
 * *
 * Authorization required: none
 */

router.get("/timezones/:continent", async function (req, res, next) {
  console.log(`GET locals/timezones/${req.params.continent}`);
  try {
    const cities = await Local.findCities(req.params.continent);
    return res.json({ cities });
  } catch (err) {
    return next(err);
  }
});


/** GET /  =>
 *   { favorite: [ { username, favorite_id, type }, ...] }
 * *
 * Authorization required: none
 */

router.get("/countries", async function (req, res, next) {
  // console.log(`GET locals/countries`);
  try {
    const countries = await Local.getLeagueCountries();
    console.debug(
      "GET locals/countries",
      "countries: ",
      countries
    );
    return res.json(countries);
  } catch (err) {
    return next(err);
  }
});


/** GET /  =>
 *   { favorite: [ { username, favorite_id, type }, ...] }
 * *
 * Authorization required: none
 */

router.get("/leagues/:country", async function (req, res, next) {
  // console.log(`GET locals/leagues/:country`);
  try {
    const leagues = await Local.getCountrysLeagues(req.params.country);
    console.debug(
      `GET locals/leagues/${req.params.country}`,
      "leagues: ",
      leagues
    );
    return res.json(leagues);
  } catch (err) {
    return next(err);
  }
});


/** GET /  =>
 *   { favorite: [ { username, favorite_id, type }, ...] }
 * *
 * Authorization required: none
 */

router.get("/cups/id/:id", async function (req, res, next) {
  // console.log(`GET locals/leagues/:country`);
  try {
    const cup = await Local.getCupById(+req.params.id);
    console.debug(
      `GET locals/cups/${req.params.id}`,
      "cup: ",
      cup
    );
    return res.json(cup);
  } catch (err) {
    return next(err);
  }
});


/** DELETE /[ { username, favorite_id, type } ]  =>  
 *            { deleted: { username, favorite_id, type } }
 *
 * Authorization: admin
 */

router.delete("/:username/:type/:favorite_id", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const { username, favorite_id, type } = req.params;
    await Favorite.remove(username, favorite_id, type);
    return res.json({ deleted: { username, favorite_id, type } });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
