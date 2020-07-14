const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllRecipes = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find().toArray();
  return recipes;
};

const getRecipeById = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return { idError: true };
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipe;
};

const recipeAlreadyRegisteredByUser = async (userId, recipeName) => { };

const registerNewRecipe = async (newRecipeData) => {
  const db = await connection();
  const newRecipe = db.collection('recipes').insertOne(newRecipeData);
  return (await newRecipe).ops[0];
};

const updateRecipe = async (recipeData) => { };

const deleteRecipeFromTable = async (recipeId) => { };

const findRecipes = async (searchTerm) => { };

const getUserRecipes = (userId) => { };

module.exports = {
  getAllRecipes,
  getRecipeById,
  recipeAlreadyRegisteredByUser,
  registerNewRecipe,
  updateRecipe,
  deleteRecipeFromTable,
  findRecipes,
  getUserRecipes,
};
