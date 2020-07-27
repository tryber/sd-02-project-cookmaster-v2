const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findRecipeByName = async (name, id = null) =>
  connection().then((db) => db.collection('users')
    .findOne({ name, _id: { $ne: ObjectId(id) } }));

const createRecipe = async ({ name, ingredients, preparation, url = '', _id }) =>
  connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, url, authorId: _id }))
    .then(({ insertedId }) => ({ id: insertedId, name, ingredients, preparation, url, authorId: _id }));

const listRecipes = async () =>
  connection()
    .then((db) => db.collection('recipes').find().toArray())
    .then((recipes) => recipes.map(({ _id, ...sprParams }) => ({ id: _id, ...sprParams })));

module.exports = {
  findRecipeByName,
  createRecipe,
  listRecipes
};
