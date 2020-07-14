const { getAllRecipes, getRecipeById, createRecipe, deleteRecipeId } = require('../models/recipesModel');
const { validationFunc } = require('./utils/schemaValidator');

const getRecipes = getAllRecipes;

const getRecipe = async (id) => getRecipeById(id);

const deleteRecipe = async (id) => deleteRecipeId(id);

const validateAndCreateRecipe = async ({ name, ingredients, preparation }, id) => {
  const isNotValid = validationFunc({ name, ingredients, preparation }, 'recipe');
  if (isNotValid.error) return isNotValid;
  return createRecipe({ name, ingredients, preparation, author: id });
};

const verifyRecipePermission = async (userId, recipeID, role) => {
  const [recipe] = await getRecipeById(recipeID);
  if (!recipe) return { error: true };
  const { author } = recipe;
  if (String(author) !== String(userId) && role !== 'admin') return { denied: true };
  return { recipe };
};

module.exports = {
  getRecipes,
  getRecipe,
  validateAndCreateRecipe,
  verifyRecipePermission,
  deleteRecipe,
};
