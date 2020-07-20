const getSchema = require('./getSchema');

const postRecipe = async (recipe) => (
  getSchema().then((db) => db.collection('recipes').insertOne(recipe))
);


module.exports = postRecipe;
