const recipesModel = require('../models/recipesModel');

const createRecipe = async (recipeParams) => recipesModel.createRecipe(recipeParams);

const getAllRecipes = async () => recipesModel.getAllRecipes();

const getRecipeById = async (id) => {
  const result = await recipesModel.getRecipeById(id);
  if (!result) {
    return { error: true, message: 'Recipe not found.', code: 'not_found' };
  }
  return result;
};

const updateRecipeById = async (recipeId, id, role, body) => {
  const recipeInfo = await getRecipeById(recipeId);
  if (recipeInfo.error) return recipeInfo;
  if (recipeInfo.authorId !== id && role !== 'adm') {
    return { error: true, message: 'You don\'t have permission to change.', code: 'forbidden' };
  }
  const result = await recipesModel.updateRecipeById(body, recipeId);
  const { image, authorId } = recipeInfo;

  return { ...result, image, authorId };
};

const deleteRecipeById = async (recipeId, userId, role) => {
  const recipeInfo = await getRecipeById(recipeId);
  if (recipeInfo.error) return recipeInfo;
  if (recipeInfo.authorId !== userId && role !== 'adm') {
    return { error: true, message: 'You don\'t have permission to delete.', code: 'forbidden' };
  }
  const result = await recipesModel.deleteRecipeById(recipeId);
  return result;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
};
