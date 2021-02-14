const config = require("config");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const genres = require("./routes/genres");
const users = require("./routes/users");
const auth = require("./routes/auth");
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
app.use("/api/genres", genres);
app.use("/api/auth", auth);
app.use("/api/users", users);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
