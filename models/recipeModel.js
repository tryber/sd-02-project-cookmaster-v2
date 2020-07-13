const connection = require('./connection');

const getAllRecipes = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find().toArray();
  return recipes;
};

const getSingleRecipe = async (idRecipe) => { };

const recipeAlreadyRegisteredByUser = async (userId, recipeName) => { };

const registerNewRecipe = async (newRecipeData) => { };

const updateRecipe = async (recipeData) => { };

const deleteRecipeFromTable = async (recipeId) => { };

const findRecipes = async (searchTerm) => { };

const getUserRecipes = (userId) => { };

module.exports = {
  getAllRecipes,
  getSingleRecipe,
  recipeAlreadyRegisteredByUser,
  registerNewRecipe,
  updateRecipe,
  deleteRecipeFromTable,
  findRecipes,
  getUserRecipes,
};
