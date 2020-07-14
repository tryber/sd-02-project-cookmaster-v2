const Joi = require('@hapi/joi/');

const addUser = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string().max(100).required(),
  password: Joi.string().max(50).required(),
});

const addRecipe = Joi.object({
  name: Joi.string().max(100).required(),
  ingredients: Joi.string().max(200).required(),
  preparation: Joi.string().max(500).required(),
});

module.exports = {
  addUser,
  addRecipe,
};
