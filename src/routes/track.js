const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");

const Track = mongoose.model("Track");

const TrackRouter = express.Router();

TrackRouter.use(requireAuth);

TrackRouter.get("/tracks", async (req, resp) => {
  const tracks = await Track.find({ userId: req.user._id });

  resp.send(tracks);
});

TrackRouter.post("/tracks", async (req, resp) => {
  const { name, locations } = req.body;

  if (!name || !locations) {
    return resp
      .status(422)
      .send({ error: "You must provide a name and locations" });
  }

  try {
    const track = new Track({ name, locations, userId: req.user._id });
    await track.save();
    resp.send(track);
  } catch (err) {
    resp.status(422).send({ error: err.message });
  }
});

module.exports = TrackRouter;
