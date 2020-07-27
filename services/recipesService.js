const recipesModel = require('../models/recipesModel');

const existsCheck = async (name, id = null) => {
  const modelCall = await recipesModel.findRecipeByName(name, id);
  if (modelCall !== null) { return true; }
  return false;
};

const listRecipes = async () => recipesModel.listRecipes();

const createRecipe = async ({ name, ingredients, preparation, _id }) => {
  if (!existsCheck(name)) { return 409; }
  const createRecipeModel = await recipesModel.createRecipe({ name, ingredients, preparation, _id });
  return createRecipeModel;
};

const showOneRecipe = async (id) => {
  const showFromModel = await recipesModel.showOneRecipe(id);
  if (showFromModel === null) { return 404; }
  return showFromModel;
};

module.exports = {
  createRecipe,
  listRecipes,
  showOneRecipe
};
