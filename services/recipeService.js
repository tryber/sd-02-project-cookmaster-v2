const recipeModel = require('../models/recipeModel');
const userModel = require('../models/userModel');

const getAllRecipes = async () =>
  recipeModel.getAllRecipes();

const registerNewRecipe = async (newRecipeData) =>
  recipeModel.registerNewRecipe(newRecipeData);

const showRecipe = async (id) => {
  const recipe = await recipeModel.getRecipeById(id);
  if (!recipe) return { error: true, code: 404, message: 'recipe not found' };
  return recipe;
};

async function checkUserAuthorization({ userId, recipeId }) {
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
  return false;
}

const editRecipe = async (editRequestData) => {
  const { name, ingredients, preparation, recipeId, userId } = editRequestData;

  const authError = await checkUserAuthorization({ userId, recipeId });

  if (authError.error) return authError;

  return recipeModel.updateRecipe({ name, ingredients, preparation, recipeId });
};

const deleteRecipe = async ({ recipeId, userId }) => {
  const authError = await checkUserAuthorization({ userId, recipeId });

  if (authError.error) return authError;

  return recipeModel.deleteRecipe(recipeId);
};

module.exports = {
  getAllRecipes,
  registerNewRecipe,
  showRecipe,
  editRecipe,
  deleteRecipe,
};
