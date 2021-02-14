const bcrypt = require("bcryptjs");
const Joi = require("joi");
const { User } = require("../models/user");
const mongoose = require("mongoose");
const router = require("express").Router();

router.post("/", async (req, res) => {
  //LETS VALIDATE THE DATA BEFORE MAKE A USER
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid password.");

  res.send(user);
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(req);
}
module.exports = router;
