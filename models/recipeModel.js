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

const registerNewRecipe = async (newRecipeData) => {
  const db = await connection();
  const newRecipe = db.collection('recipes').insertOne(newRecipeData);
  return (await newRecipe).ops[0];
};

const updateRecipe = async ({ name, ingredients, preparation, recipeId }) =>
  connection()
    .then((db) => db
      .collection('recipes')
      .findOneAndUpdate({ _id: ObjectId(recipeId) }, { $set: { name, ingredients, preparation } }))
    .then(({ value }) => value)
    .catch((e) => e);

module.exports = {
  getAllRecipes,
  getRecipeById,
  registerNewRecipe,
  updateRecipe,
};
