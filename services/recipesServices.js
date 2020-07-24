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

const updateRecipeById = async (recipe, user, id) => {
  const { _id, role } = user;
  const existRecipe = await findRecipeById(id);
  const { authorId } = existRecipe;
  if (String(authorId) === String(_id) || role === 'admin') {
    const mountedRecipe = { ...recipe, url: '', authorId };
    const updatedRecipe = await recipesModel.updateRecipeById(id, mountedRecipe);
    return updatedRecipe;
  }
  const err = { error: { message: 'You not have permission to update', code: 'Unauthorized' } };
  throw err;
};

module.exports = {
  newRecipe,
  getAllRecipes,
  findRecipeById,
  updateRecipeById,
};
