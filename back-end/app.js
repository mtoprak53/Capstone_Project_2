"use strict";

/** Express app for Football Info App */

const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");

// console.log("In app line 10 !!");

const { authenticateJWT } = require("./middleware/auth");

// console.log("In app line 14 !!");

const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const favoritesRoutes = require("./routes/favorites");
const localsRoutes = require("./routes/locals");

// console.log("In app line 21 !!");

const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/favorites", favoritesRoutes);
app.use("/locals", localsRoutes);


/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here */
app.use(function (err, req, res, next) {
  // if (process.env.NODE_ENV !== "test" &&
  //     process.env.NODE_ENV !== "other") {
  // console.log("process.env.NODE_ENV-1");
  // console.log(process.env.NODE_ENV);
  if (err.stack &&
    process.env.NODE_ENV !== "test" &&
    // process.env.NODE_ENV !== "" &&
    process.env.NODE_ENV !== "other") {
      // console.log("process.env.NODE_ENV-2");
      // console.log(process.env.NODE_ENV);
      // console.log(NotFoundError());
      console.error(err.stack);
      // console.error("404 ERROR: ", err);
  }
  const status = err.status || 500;
  const message = err.message;

  // console.log("status:")
  // console.log(status)
  // console.log("message:")
  // console.log(message)
  
  return res.status(status).json({
    error: { message, status },
  });
});
  
// console.log("In app line 63 !!");

module.exports = app;
    