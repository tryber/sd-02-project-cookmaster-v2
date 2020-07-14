const Joi = require('@hapi/joi');

const schemaUser = Joi.object({
  name: Joi.string()
    .required(),

  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(3)
    .required(),
});

const schemaRecipe = Joi.object({
  name: Joi.string()
    .required(),
  ingredients: Joi.string()
    .required(),
  preparation: Joi.string()
    .min(5)
    .required(),
});

const objValidation = {
  user: schemaUser,
  recipe: schemaRecipe,
};

const validationFunc = (body, validationField) => {
  const { error } = objValidation[validationField].validate(body);
  if (error) {
    return { error: true, message: error.details[0].message };
  }
  return { error: false };
};

module.exports = {
  validationFunc,
};
