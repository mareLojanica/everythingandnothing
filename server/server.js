const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const pictures = require('./routes/api/pictures');
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require('cors')
const app = express();
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// DB Config

const db = require("./config/keys").mongoURI;
const mongoConfig = require("./config/keys").mongoConfig;
//connect to mongo db
mongoose
  .connect(db, mongoConfig)
  .then(() => {
    console.log("mongo db connected");
  })
  .catch((err) => console.log(err));
//passport middleware
// app.use(cors)
app.use(passport.initialize());
app.use("/public", express.static(path.join("public/")));
//passport config
require("./config/passport.js")(passport);

//use routes

app.use("/api/users", users);
app.use("/api/pictures", pictures);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
