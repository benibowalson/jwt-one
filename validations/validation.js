// Validation with Joi
const Joi = require("joi");
const validateRequestBody = (req, res, next) => {
  const regRules = {
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).email().required(),
    password: Joi.string().min(6).required(),
  };
  const regSchema = Joi.object(regRules);
  const regOptions = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  // Validate request body
  const { error, value } = regSchema.validate(req.body, regOptions);
  if (error) {
    next(error);
  } else {
    req.body = value;
    next();
  }
};

module.exports.validate_body = validateRequestBody;
