const recipesModel = require('../models/recipesModel');

const createRecipe = async (recipeParams) => recipesModel.createRecipe(recipeParams);

const getAllRecipes = async () => recipesModel.getAllRecipes();

const getRecipeById = async (id) => {
  const result = await recipesModel.getRecipeById(id);
  console.log(result);
  if (!result) {
    return { error: true, message: 'Id not found.', code: 'not_found' };
  }
  return result;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};
