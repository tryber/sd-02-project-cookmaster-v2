const Joi = require('@hapi/joi');
const postRecipe = require('../models/postRecipe');
const getAllRecipes = require('../models/getAllRecipes');
const getOneRecipe = require('../models/getOneRecipe');

const schema = Joi.object({
  name: Joi.string()
    .required(),
  ingredients: Joi.string()
    .required(),
  preparation: Joi.string()
    .required()
});

const objectError = {
  internal: (err) => ({ error: { message: err.message, code: 'internal_error' } }),
  data: (error) => ({ error: { message: error.message, code: 'invalid_data' } }),
};

const newRecipe = async (id, { name, ingredients, preparation }) => {
  const { error } = schema.validate({ name, ingredients, preparation });
  if (error) return objectError.data(error);
  return postRecipe({ name, ingredients, preparation, URLimage: '', creatorId: id })
    .catch((error) => objectError.internal(error));
}

const findAll = async () =>
  getAllRecipes()
    .catch((error) => objectError.internal(error));

const findOne = async (id) =>
  getOneRecipe(id)
    .then((results) => ({ results }))
    .catch((error) => objectError.internal(error));


module.exports = { newRecipe, findAll, findOne }