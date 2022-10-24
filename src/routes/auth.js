const express = require("express");

const AuthRoute = express.Router();

AuthRoute.post("/signup", (req, res) => {
  console.log(req.body);
  res.send("You made a post request");
});

module.exports = AuthRoute;
