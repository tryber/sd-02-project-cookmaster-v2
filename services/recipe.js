const Joi = require('@hapi/joi');
const postRecipe = require('../models/postRecipe');
const getAllRecipes = require('../models/getAllRecipes');
const getOneRecipe = require('../models/getOneRecipe');
const updateRecipe = require('../models/updateRecipe');
const postDelete = require('../models/postDelete');

const schema = Joi.object({
  name: Joi.string()
    .required(),
  ingredients: Joi.string()
    .required(),
  preparation: Joi.string()
    .required(),
});

const objectError = {
  internal: (err) => ({ error: { message: err.message, code: 'internal_error' } }),
  data: (error) => ({ error: { message: error.message, code: 'invalid_data' } }),
  unauthorized: (message) => ({ error: { message, code: 'unauthorized' } }),
};

const newRecipe = async (id, { name, ingredients, preparation }) => {
  const { error } = schema.validate({ name, ingredients, preparation });
  if (error) return objectError.data(error);
  return postRecipe({ name, ingredients, preparation, URLimage: '', creatorId: id })
    .catch((err) => objectError.internal(err));
};

const findAll = async () =>
  getAllRecipes()
    .catch((error) => objectError.internal(error));

const findOne = async (id) =>
  getOneRecipe(id)
    .then((results) => ({ results }))
    .catch((error) => objectError.internal(error));

const editRecipe = async (recipeId, { id, role }, { name, ingredients, preparation }) => {
  const { error } = schema.validate({ name, ingredients, preparation });
  if (error) return objectError.data(error);
  const recipe = await getOneRecipe(recipeId).catch((err) => objectError.internal(err));
  if (recipe.error) return recipe.error;
  if (id.toString() !== recipe.creatorId.toString() && role !== 'admin') return objectError.unauthorized('Access denied');
  return updateRecipe(recipeId, name, ingredients, preparation)
    .catch((err) => objectError.internal(err));
};

const deleteRecipe = async (recipeId, { id, role }) => {
  const recipe = await getOneRecipe(recipeId).catch((error) => objectError.internal(error));
  if (recipe.error) return recipe.error;
  if (id.toString() !== recipe.creatorId.toString() && role !== 'admin') return objectError.unauthorized('Access denied');
  return postDelete(recipeId).catch((error) => objectError.internal(error));
};

module.exports = { newRecipe, findAll, findOne, editRecipe, deleteRecipe };
