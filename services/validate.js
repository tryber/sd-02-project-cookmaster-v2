const Joi = require('joi');

const isUserValid = Joi.object({
  name: Joi
    .string()
    .alphanum()
    .min(3)
    .required(),
  // email references https://joi.dev/api/?v=17.2.1#example
  email: Joi
    .string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: ['com', 'net'],
      },
    })
    .required(),

  password: Joi
    .string()
    .alphanum()
    .min(6)
    .required(),
});

const isLoginValid = Joi.object({
  email: Joi
    .string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: ['com', 'net'],
      },
    })
    .required(),

  password: Joi
    .string()
    .alphanum()
    .min(6)
    .required(),
});

const isRecipeValid = Joi.object({
  name: Joi
    .string()
    .min(3)
    .required(),

  ingredients: Joi
    .string()
    .min(3)
    .required(),

  preparation: Joi
    .string()
    .min(10)
    .required(),
});

module.exports = {
  isUserValid,
  isRecipeValid,
  isLoginValid,
};
