const Joi = require('@hapi/joi/');

const addUser = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string().max(100).required(),
  password: Joi.string().max(50).required(),
});

module.exports = {
  addUser,
};
