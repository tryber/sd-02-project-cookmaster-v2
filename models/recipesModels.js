const { ObjectId } = require('mongodb');
const connection = require('./connection');

const newRecipe = async (recipe) => {
  const db = await connection();
  const recipeNew = await db.collection('recipes').insertOne(recipe);
  return recipeNew.ops;
};

const findByName = async (name) => {
  const db = await connection();
  const recipe = await db.collection('recipes').findOne({ name });
  return recipe;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipe;
};

const getAllRecipes = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find().toArray();
  return recipes;
};

module.exports = {
  newRecipe,
  findByName,
  findById,
  getAllRecipes,
};
