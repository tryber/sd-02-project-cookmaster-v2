const recipeModel = require('../models/recipeModel');
const userModel = require('../models/userModel');

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

const editRecipe = async (editRequestData) => {
  const { name, ingredients, preparation, recipeId, userId } = editRequestData;

  const [recipe, user] = await Promise.all([
    recipeModel.getRecipeById(recipeId),
    userModel.getUserById(userId),
  ]);

  if (!recipe) return { error: true, code: 404, message: 'recipe not found' };

  if (recipe.userId.toString() !== userId.toString() && user.role !== 'admin') {
    return {
      error: true,
      code: 403,
      message: 'You don\'t have permission to perform this action. Edit your own recipes ou log in as admin',
    };
  }

  return recipeModel.updateRecipe({ name, ingredients, preparation, recipeId });
};

module.exports = {
  getAllRecipes,
  registerNewRecipe,
  showRecipe,
  editRecipe,
};
