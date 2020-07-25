const recipeModels = require('../models/recipeModels');

const createRecipe = (recipe) => recipeModels.createRecipe(recipe);

module.exports = {
  createRecipe,
};
