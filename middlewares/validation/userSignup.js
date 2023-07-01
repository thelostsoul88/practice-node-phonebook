const Joi = require("joi");

const userSignup = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const userSignupValidation = async (req, res, next) => {
  const { error } = userSignup.validate(req.body);

  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }

  next();
};

module.exports = userSignupValidation;
