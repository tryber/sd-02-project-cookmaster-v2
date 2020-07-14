const recipesModel = require('../models/recipesModel');

const createRecipe = async (recipeParams) => recipesModel.createRecipe(recipeParams);

const getAllRecipes = async () => recipesModel.getAllRecipes();

module.exports = {
  createRecipe,
  getAllRecipes,
};
