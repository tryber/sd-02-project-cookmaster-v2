const Joi = require('@hapi/joi');

const schema = Joi.object({
  name: Joi.string()
    .required(),

  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(3)
    .required(),
});

const validationNewUser = (body) => {
  const { error } = schema.validate(body);
  if (error) {
    return { error: true, message: error.details[0].message };
  }
  return { error: false };
};

module.exports = {
  validationNewUser,
};
