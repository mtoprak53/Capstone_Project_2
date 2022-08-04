"use strict";

/** Routes for favorites. */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureAdmin } = require("../middleware/auth");
const Favorite = require("../models/favorite");

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

router.post("/", ensureAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, favoriteNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const favorite = await Favorite.create(req.body);
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

router.get("/:username/:type", async function (req, res, next) {
  try {
    const { username, type } = req.params;
    const favorites = await Favorite.findAll(username, type);
    return res.json({ favorites });
  } catch (err) {
    return next(err);
  }
});


/** DELETE /[ { username, favorite_id, type } ]  =>  
 *            { deleted: { username, favorite_id, type } }
 *
 * Authorization: admin
 */

router.delete("/:username/:type/:favorite_id", ensureAdmin, async function (req, res, next) {
  try {
    const { username, favorite_id, type } = req.params;
    await Favorite.remove(username, favorite_id, type);
    return res.json({ deleted: { username, favorite_id, type } });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
