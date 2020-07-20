const getRecipes = require('./getRecipes');
const recipeDetails = require('./recipeDetails');
const postNewUser = require('./postNewUser');
const login = require('./login');
const postNewRecipe = require('./postNewRecipe');
const recipeEdit = require('./recipeEdit');
const recipeDelete = require('./recipeDelete');

module.exports = {
  recipeDetails,
  login,
  postNewUser,
  getRecipes,
  postNewRecipe,
  recipeEdit,
  recipeDelete,
};
