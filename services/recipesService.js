const recipesModel = require('../models/recipesModel');
const usersModel = require('../models/usersModel');

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

const updateRecipe = async ({ name, ingredients, preparation, _id, id }) => {
  console.log('_id: ', _id);
  const recipeFound = await recipesModel.findRecipeById(id);
  if (!recipeFound) { return 404; }
  const checkAdmin = await usersModel.findById(_id);
  console.log('checkAdmin Id: ', checkAdmin)
  if (JSON.stringify(recipeFound.authorId) !== JSON.stringify(_id) && checkAdmin.role === 'user') { return 401; }
  const updateRecipeModel = await recipesModel.updateRecipe({ name, ingredients, preparation, id });
  return updateRecipeModel;
};

const deleteRecipe = async (id) => {
  const deleteFromModel = await recipesModel.deleteRecipe(id);
  if (deleteFromModel === null) { return 404; }
  return deleteFromModel;
};

const uploadRecipeImage = async (id, filename) => {
  const url = `http://localhost:3001/images/${filename}`;
  const updatedRecipe = await recipesModel.addImage(id, url);
  return updatedRecipe;
};

module.exports = {
  createRecipe,
  listRecipes,
  showOneRecipe,
  updateRecipe,
  deleteRecipe,
  uploadRecipeImage
};
