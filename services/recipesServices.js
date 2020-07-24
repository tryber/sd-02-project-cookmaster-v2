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

module.exports = {
  newRecipe,
};
