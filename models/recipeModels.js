const { ObjectId } = require('mongodb');
const connection = require('./connections');

const createRecipe = async (recipe) => {
  try {
    const createdRecipe = await connection()
      .then((db) => db.collection('recipes').insertOne(recipe))
      .then((result) => result.ops[0]);
    return createdRecipe;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const getAllRecipes = async () => {
  try {
    const allRecipes = await connection()
      .then((db) => db.collection('recipes').find().toArray());
    return allRecipes;
  } catch (err) {
    console.error(err);
    return false;
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
};
