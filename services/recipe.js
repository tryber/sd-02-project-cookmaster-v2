const Joi = require('@hapi/joi');
const postRecipe = require('../models/postRecipe');
const getAllRecipes = require('../models/getAllRecipes');
const getOneRecipe = require('../models/getOneRecipe');
const updateRecipe = require('../models/updateRecipe');
const postDelete = require('../models/postDelete');
const updateImage = require('../models/updateImage');

const schema = Joi.object({
  name: Joi.string()
    .required(),
  ingredients: Joi.string()
    .required(),
  preparation: Joi.string()
    .required(),
});

const validPermission = (id, recipe, role) => JSON.stringify(id) !== JSON.stringify(recipe.creatorId) && role !== 'admin';

const objectError = {
  internal: (err) => ({ error: { message: err.message, code: 'internal_error' } }),
  data: (error) => ({ error: { message: error.message, code: 'invalid_data' } }),
  unauthorized: (message) => ({ error: { message, code: 'unauthorized' } }),
};

const newRecipe = async (id, { name, ingredients, preparation }) => {
  const { error } = schema.validate({ name, ingredients, preparation });
  if (error) return objectError.data(error);
  return postRecipe({ name, ingredients, preparation, URLimage: '', creatorId: id })
    .then((results) => ({ ...results }))
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
  if (!recipe || recipe.error) return recipe || objectError.data({ message: 'Recipe no exist' });
  if (validPermission(id, recipe, role)) return objectError.unauthorized('Access denied');
  return updateRecipe(recipeId, name, ingredients, preparation)
    .catch((err) => objectError.internal(err));
};

const deleteRecipe = async (recipeId, { id, role }) => {
  const recipe = await getOneRecipe(recipeId).catch((error) => objectError.internal(error));
  if (!recipe) return {};
  if (recipe.error) return recipe;
  if (validPermission(id, recipe, role)) return objectError.unauthorized('Access denied');
  return postDelete(recipeId).catch((error) => objectError.internal(error));
};

const validInsertImage = async (recipeId, { id, role }) => {
  const recipe = await getOneRecipe(recipeId).catch((err) => objectError.internal(err));
  if (recipe.error) return recipe;
  if (validPermission(id, recipe, role)) return objectError.unauthorized('Access denied');
};

const insertImageId = async ({ filename = null }, id) => {
  if (!filename) return objectError.internal({ message: 'Unknown Error', code: 'internal_error' });
  return updateImage(id, filename).catch((error) => objectError.internal(error));
};

module.exports = {
  newRecipe, findAll, findOne, editRecipe, deleteRecipe, validInsertImage, insertImageId,
};