const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const AuthRoute = require("./routes/auth");

const app = express();

app.use(bodyParser.json());
app.use(AuthRoute);

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
app.get("/", (req, res) => {
  res.send("Hi There!");
});

app.listen(5438, () => console.log("Listening on port 5438"));
