const Joi = require('@hapi/joi');

const email = Joi.string().email().required();

const password = Joi.string().min(6).required();

const userSchema = Joi.object({
  email,
  password,
}).unknown(false);

module.exports = {
  userSchema,
};
