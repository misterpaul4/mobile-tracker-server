const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");

const AuthRoute = express.Router();

AuthRoute.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const user = new User({ email, password });

  try {
    await user.save();

    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send({ token });
  } catch (error) {
    return res.status(422).send(error.message); // send back the error message
  }
});

AuthRoute.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password) {
    return res.status(422).send({ error: "Must provide email and password" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(422).send({ error: "User not found!" });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send({ token });
  } catch (error) {
    return res.status(422).send({ error: "Invalid password or email" });
  }
});

module.exports = AuthRoute;
