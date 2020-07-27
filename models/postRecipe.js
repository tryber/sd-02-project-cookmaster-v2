const getSchema = require('./getSchema');

const postRecipe = async (recipe) => (
  getSchema().then((db) => db.collection('recipes').insertOne(recipe)).then(({ ops }) => ops[0])
);


module.exports = postRecipe;
