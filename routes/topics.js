const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Topic, validate } = require("../models/topic");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const topics = await Topic.find().sort("name");
  res.send(topics);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let topic = new Topic({ name: req.body.name });
  topic = await topic.save();

  res.send(topic);
});

router.put("/:id", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const topic = await Topic.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );

  if (!topic)
    return res.status(404).send("The topic with the given ID was not found.");

  res.send(topic);
});
// [auth,admin] is two middleware functions
router.delete("/:id", [auth, admin], async (req, res) => {
  const topic = await topic.findByIdAndRemove(req.params.id);

  if (!topic)
    return res.status(404).send("The topic with the given ID was not found.");

  res.send(topic);
});

router.get("/:id", async (req, res) => {
  const topic = await topic.findById(req.params.id);

  if (!topic)
    return res.status(404).send("The topic with the given ID was not found.");

  res.send(topic);
});

module.exports = router;
