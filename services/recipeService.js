const recipeModel = require('../models/recipeModel');

const getAllRecipes = async () =>
  recipeModel.getAllRecipes();

const registerNewRecipe = async (newRecipeData) =>
  recipeModel.registerNewRecipe(newRecipeData);

const showRecipe = async (id) => {
  const recipe = await recipeModel.getRecipeById(id);
  if (!recipe) return { error: true, code: 404, message: 'recipe not found' };
  if (recipe.idError) return { error: true, code: 400, message: 'invalid recipe ID' };
  return recipe;
};

module.exports = {
  getAllRecipes,
  registerNewRecipe,
  showRecipe,
};
