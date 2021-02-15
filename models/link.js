const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const { topicSchema } = require("./topic");

const Link = mongoose.model(
  "Links",
  new mongoose.Schema({
    address: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    topic: {
      type: topicSchema,
      required: true,
    },
  })
);

function validateLink(link) {
  const schema = Joi.object({
    address: Joi.string().min(5).max(255).required(),
    topicId: Joi.objectId().required(),
  });

  return schema.validate(link);
}

exports.Link = Link;
exports.validate = validateLink;
