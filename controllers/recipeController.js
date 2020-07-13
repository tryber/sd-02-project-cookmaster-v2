const recipeService = require('../services/recipeService');

const listRecipes = async (_req, res) => {
  const recipes = await recipeService.getAllRecipes();
  return res.status(200).json(recipes);
};

const showRecipe = async (req, res) => {};

const newRecipe = async (req, res) => {};

const editRecipe = async (req, res) => {};

const deleteRecipe = async (req, res) => {};

module.exports = {
  listRecipes,
  showRecipe,
  newRecipe,
  editRecipe,
  deleteRecipe,
};
