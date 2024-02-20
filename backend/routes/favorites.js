"use strict";

/** Routes for favorites. */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureCorrectUserOrAdmin } = require("../middleware/auth");
const Favorite = require("../models/favorite");

const favoriteNewSchema = require("../schemas/favoriteNew.json");

const router = new express.Router();


// TODO: favorite_id -> favoriteId
/** POST /[username] { favorite_id, type } =>  { favorite: { username, <type>Id } }
 * 
 * type is either 'league', 'cup', or 'team'
 * 
 * Authorization required: admin or same user-as-:username
 */

router.post("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
  // console.log("POST  >>  FAVORITES/");
  // console.log(req.body);
  try {
    const { username } = req.params;
    const { favorite_id, type } = req.body;

    const validator = jsonschema.validate({ username, favorite_id, type}, favoriteNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const favorite = await Favorite.create(username, favorite_id, type);
    return res.status(201).json({ favorite });
  } catch (err) {
    return next(err);
  }
});


/** GET /[username]/[type]  => { favorites }
 * 
 * type is either 'league', 'cup', or 'team'
 * 
 * Returns  { favorites: [ { username, id, name, country, logoUrl, flagUrl }, ... ] }
 * *
 * Authorization required: admin or same user-as-:username
 */

router.get("/:username/:type", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const { username, type } = req.params;
    const favorites = await Favorite.findAll(username, type);
    // console.log(favorites);
    return res.json({ favorites });
  } catch (err) {
    return next(err);
  }
});


/** DELETE /[ { username, favorite_id, type } ]  =>  
 *            { deleted: { username, favorite_id, type } }
 * 
 * type is either 'league', 'cup', or 'team'
 *
 * Authorization: admin or same user-as-:username
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
