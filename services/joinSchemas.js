const Joi = require('@hapi/joi');

const confirm = Joi.string().valid(Joi.ref('password')).required();

const email = Joi.string().email().required();

const ingredients = Joi.string().required();

const name = Joi.string().required();

const password = Joi.string().min(5).required();

const preparation = Joi.string().required();

const role = Joi.string();

const loginSchema = Joi.object({
  email,
  password,
}).unknown(false);

const recipesSchema = Joi.object({
  ingredients,
  name,
  preparation,
}).unknown(false);

const userSchema = Joi.object({
  confirm,
  email,
  name,
  password,
  role,
}).unknown(false);

module.exports = {
  loginSchema,
  recipesSchema,
  userSchema,
};
