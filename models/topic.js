const Joi = require("joi");
const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const Topic = mongoose.model("Topic", topicSchema);

function validateTopic(topic) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(topic);
}

exports.topicSchema = topicSchema;
exports.Topic = Topic;
exports.validate = validateTopic;
