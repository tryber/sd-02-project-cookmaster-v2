const recipeModel = require('../models/recipeModel');

const getAllRecipes = () =>
  recipeModel.getAllRecipes();

module.exports = {
  getAllRecipes,
};
