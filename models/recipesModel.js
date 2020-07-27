const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findRecipeByName = async (name, id = null) =>
  connection().then((db) => db.collection('users')
    .findOne({ name, _id: { $ne: ObjectId(id) } }));

const createRecipe = async ({ name, ingredients, preparation, url = '', _id }) =>
  connection()
    .then((db) => db.collection('users').insertOne({ name, ingredients, preparation, url, authorId: _id }))
    .then(({ insertedId }) => ({ id: insertedId, name, ingredients, preparation, url, authorId: _id }));

module.exports = {
  findRecipeByName,
  createRecipe
};
