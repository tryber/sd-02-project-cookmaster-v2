const getSchema = require('./getSchema');
const { ObjectId } = require('mongodb');

const getAllRecipes = async (id) => (
  getSchema().then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }))
);


module.exports = getAllRecipes;