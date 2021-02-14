const config = require("config");
const dotenv = require("dotenv");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const links = require("./routes/link");
const topics = require("./routes/topics");
const users = require("./routes/users");
const auth = require("./routes/auth");
const express = require("express");
const app = express();

dotenv.config();

mongoose
  .connect("mongodb://localhost:27017/newAuth", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

//middlewares
app.use(express.json());
app.use("/api/links", links);
app.use("/api/topics", topics);
app.use("/api/auth", auth);
app.use("/api/users", users);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
