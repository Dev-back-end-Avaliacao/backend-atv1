const express = require("express");
const defaultRoute = express.Router();

defaultRoute.get("/", (req, res) => {
  res.send("Hello World ");
});

module.exports = defaultRoute;
