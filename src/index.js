// models must be imported at the very top
require("./models/User");
require("./models/track");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const AuthRoute = require("./routes/auth");
const TrackRoutes = require("./routes/track");
const requireAuth = require("./middlewares/requireAuth");
const app = express();

app.use(bodyParser.json());
app.use(AuthRoute);
app.use(TrackRoutes);

const mongoUri =
  "mongodb+srv://admin:adminadmin@atlascluster.8hie9zh.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoUri);

mongoose.connection.on("connected", () =>
  console.log("connected to mongo instance")
);

mongoose.connection.on("error", (err) =>
  console.error("error connecting to mongo instance")
);

// get requests
app.get("/", requireAuth, (req, res) => {
  res.send(`Your email is ${req.user.email}`);
});

app.listen(4444, () => console.log("Listening on port 4444"));
