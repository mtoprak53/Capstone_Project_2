"use strict";

/** Express app for Football Info App */

const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const favoritesRoutes = require("./routes/favorites");
const localsRoutes = require("./routes/locals");

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
  if (err.stack &&
      process.env.NODE_ENV !== "test" &&
      // process.env.NODE_ENV !== "" &&
      process.env.NODE_ENV !== "other") {
    console.log(process.env.NODE_ENV);
    // console.log(NotFoundError());
    console.error(err.stack);
  }
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
