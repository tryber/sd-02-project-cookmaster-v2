const getSchema = require('./getSchema');

const getAllRecipes = async () => (
  getSchema().then((db) => db.collection('recipes').find().toArray())
);


module.exports = getAllRecipes;
