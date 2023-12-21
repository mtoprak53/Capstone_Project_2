"use strict";

/** Convenience middleware to handle common auth cases in routes. */

// const jwt = require("jsonwebtoken");  // old
const jose = require("jose");  // new

const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../expressError");


/** Middleware: Authenticate user. 
 *  
 *  If a token was provided, verify it, and, if valid, store the token payload 
 *  on res.locals (this will include the username and isAdmin field.)
 * 
 *  It's not an error if no token was provided or if the token is not valid.
*/

async function authenticateJWT(req, res, next) {
  // console.log("THIS IS /middleware/auth/authenticateJWT !!");

  try {
    const authHeader = req.headers && req.headers.authorization;
    if (authHeader) {

      // console.log("authHeader");
      // console.log(authHeader);
      
      const token = authHeader.replace(/^[Bb]earer/, "").trim();
      // console.log("token");
      // console.log(token);

      const { payload, protectedHeader } = await jose.jwtVerify(token, SECRET_KEY);

      // console.log(protectedHeader)
      // console.log(payload)
      // console.log(protectedHeader.username)
      // console.log(protectedHeader.isAdmin)

      res.locals.user = protectedHeader;

      // res.locals.user = jose.jwtVerify(token, SECRET_KEY);
    }
    return next();
  } catch (err) {
    return next();
  }
}

/** Middleware to use when they must be logged in.
 *  
 *  If not, raises Unauthorized.
 */

function ensureLoggedIn(req, res, next) {
  try {
    if (!res.locals.user) throw new UnauthorizedError();
    return next();
  } catch (err) {
    return next(err);
  }
}

/** Middleware to use when they be logged in as an admin user.
 *  
 *  If not, raises Unauthorized.
 */

function ensureAdmin(req, res, next) {
  try {
    const user = res.locals.user;
    // console.log("user");
    // console.log(user);
    if (!(user && user.isAdmin)) {
      throw new UnauthorizedError();
    }
    return next();
  } catch (err) {
    return next(err);
  }
}

/** Middleware to use when they must provide a valid token & be user matching
 *  username provided as route param.
 * 
 *  If not, raises Unauthorized.
 */

function ensureCorrectUserOrAdmin(req, res, next) {
  // console.log("ensureCorrectUserOrAdmin");

  try {
    const user = res.locals.user;
    // console.log("user");
    // console.log(user);
    if (!(user && (user.isAdmin || user.username === req.params.username))) {
      throw new UnauthorizedError();
    }
    return next();
  } catch (err) {
    return next(err);
  }
}


module.exports = {
  authenticateJWT,
  ensureLoggedIn,
  ensureAdmin,
  ensureCorrectUserOrAdmin,
};
