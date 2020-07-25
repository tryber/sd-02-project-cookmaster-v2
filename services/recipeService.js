const recipeModels = require('../models/recipeModels');

const createRecipe = (recipe) => recipeModels.createRecipe(recipe);

const getAllRecipes = recipeModels.getAllRecipes;

const findById = (id) => recipeModels.findById(id);

const validateRecipe = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    return { status: 200, error: 'Dados Inválidos', code: 'invalid_data' };
  }

  if (typeof name !== 'string' || typeof ingredients !== 'string' || typeof preparation !== 'string') {
    return { status: 200, error: 'Formato inválido', code: 'invalid_data_format' };
  }

  return true;
};

module.exports = {
  createRecipe,
  validateRecipe,
  getAllRecipes,
  findById,
};
