const recipesModel = require('../models/recipesModel');

const existsCheck = async (name, id = null) => {
  const modelCall = await recipesModel.findRecipeByName(name, id);
  if (modelCall !== null) { return true; }
  return false;
};

const createRecipe = async ({ name, ingredients, preparation, _id }) => {
  if (!existsCheck(name)) { return 409; }
  const createRecipeModel = await recipesModel.createRecipe({ name, ingredients, preparation, _id });
  return createRecipeModel;
};

module.exports = {
  createRecipe
}
