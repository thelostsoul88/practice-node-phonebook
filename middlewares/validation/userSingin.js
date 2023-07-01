const Joi = require("joi");

const signinSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const userSigninValidation = async (req, res, next) => {
  const { error } = signinSchema.validate(req.body);

  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }
  next();
};

module.exports = userSigninValidation;
