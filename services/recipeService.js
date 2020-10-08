const recipeModel = require('../models/recipeModel');

const getAllRecipes = async () =>
  recipeModel.getAllRecipes();

const registerNewRecipe = async (newRecipeData) =>
  recipeModel.registerNewRecipe(newRecipeData);

const showRecipe = async (id) => {
  const recipe = await recipeModel.getRecipeById(id);
  if (!recipe) return { error: true, code: 404, message: 'recipe not found' };
  return recipe;
};

const editRecipe = async (editRequestData) => {
  const { name, ingredients, preparation, recipeId } = editRequestData;

  return recipeModel.updateRecipe({ name, ingredients, preparation, recipeId });
};

const deleteRecipe = async (id) => recipeModel.deleteRecipe(id);

const insertRecipeImage = async (imageData) => recipeModel.insertRecipeImage(imageData);

module.exports = {
  getAllRecipes,
  registerNewRecipe,
  showRecipe,
  editRecipe,
  deleteRecipe,
  insertRecipeImage,
};
