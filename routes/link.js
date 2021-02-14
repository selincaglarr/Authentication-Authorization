const { Link, validate } = require("../models/link");
const { Topic } = require("../models/topic");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const links = await Link.find().sort("name");
  res.send(links);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const topic = await Topic.findById(req.body.topicId);
  if (!topic) return res.status(400).send("Invalid topic.");

  const link = new Link({
    address: req.body.address,
    topic: {
      _id: topic._id,
      name: topic.name,
    },
  });
  await link.save();

  res.send(link);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const topic = await Topic.findById(req.body.topicId);
  if (!topic) return res.status(400).send("Invalid topic.");

  const link = await Link.findByIdAndUpdate(
    req.params.id,
    {
      address: req.body.address,
      topic: {
        _id: topic._id,
        name: topic.name,
      },
    },
    { new: true }
  );

  if (!link)
    return res.status(404).send("The link with the given ID was not found.");

  res.send(link);
});

router.delete("/:id", async (req, res) => {
  const link = await Link.findByIdAndRemove(req.params.id);

  if (!link)
    return res.status(404).send("The link with the given ID was not found.");

  res.send(link);
});

router.get("/:id", async (req, res) => {
  const link = await Link.findById(req.params.id);

  if (!link)
    return res.status(404).send("The link with the given ID was not found.");

  res.send(link);
});

module.exports = router;
