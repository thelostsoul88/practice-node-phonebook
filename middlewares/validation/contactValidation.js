const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required().trim(),
  number: Joi.string().required().trim(),
});

const FIELDS = ["name", "number"];

const validateContact = (req, res, next) => {
  const { body } = req;
  if (Object.keys(body).length === 0) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  for (const field of FIELDS) {
    if (!body[field]) {
      res.status(400).json({ message: `missing field ${field}` });
      return;
    }
  }

  const { error } = contactSchema.validate(body);

  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }

  next();
};

module.exports = validateContact;
