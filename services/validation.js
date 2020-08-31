const Joi = require('joi');

const userValidation = Joi.object({
  name: Joi.string()
    .min(3)
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),

  password: Joi.string()
    .min(8)
    .required()
});


module.exports = {
  userValidation,
};
