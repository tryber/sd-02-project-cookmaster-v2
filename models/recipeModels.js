const connection = require('./connections');
const { ObjectId } = require('mongodb');

const createRecipe = async (recipe) => {
  try {
    const createdRecipe = connection()
      .then((db) => db.collection('recipes').insertOne(recipe))
      .then((result) => result.ops[0]);
    return createdRecipe;
  } catch (err) {
    console.error(err);
    return false;
  }
}

module.exports = {
  createRecipe,
};
