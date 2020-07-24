const recipesModel = require('../models/recipesModels');

const newRecipe = async (recipe, user) => {
  const { _id } = user;
  const { name } = recipe;
  const existRecipe = await recipesModel.findByName(name);

  if (existRecipe) {
    const err = { error: { message: 'Recipe name already exists', code: 'Already_exists' } };
    throw err;
  }
  const mountedId = { ...recipe, url: '', authorId: _id };
  const createdRecipe = await recipesModel.newRecipe(mountedId);
  return createdRecipe;
};

const getAllRecipes = async () => {
  const allRecipes = await recipesModel.getAllRecipes();
  return allRecipes;
};

const findRecipeById = async (id) => {
  const recipe = await recipesModel.findById(id);
  if (recipe === null) {
    const err = { error: { message: 'Recipe not found', code: 'Not_found' } };
    throw err;
  }
  return recipe;
};

module.exports = {
  newRecipe,
  getAllRecipes,
  findRecipeById,
};
