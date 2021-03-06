const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("../config/database");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//route
app.use("/api", require("./routes/v1.0"));

app.use(function (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  console.error(err.stack);

  return res.status(err.status).json({ message: err.message });
});

module.exports = app;
