const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) { return null; }
  return connection()
    .then((db) => db.collection('recipes').findOne(ObjectId(id)));
};

const findRecipeByName = async (name, id = null) =>
  connection().then((db) => db.collection('recipes')
    .findOne({ name, _id: { $ne: ObjectId(id) } }));

const createRecipe = async ({ name, ingredients, preparation, url = '', _id }) =>
  connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, url, authorId: _id }))
    .then(({ insertedId }) => ({ id: insertedId, name, ingredients, preparation, url, authorId: _id }));

const listRecipes = async () =>
  connection()
    .then((db) => db.collection('recipes').find().toArray())
    .then((recipes) => recipes.map(({ _id, ...sprParams }) => ({ id: _id, ...sprParams })));

const showOneRecipe = async (id) => {
  const searchId = await findRecipeById(id);
  if (searchId === null) {
    return null;
  }
  const { _id, name, ingredients, preparation, url, authorId } = searchId;
  return { id: _id, name, ingredients, preparation, url, authorId };
};

const updateRecipe = async ({ name, ingredients, preparation, id }) =>
  connection()
    .then((db) => db.collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }));

const deleteRecipe = async (id) => {
  const searchId = await findRecipeById(id);
  if (searchId === null) {
    return null;
  }
  await connection()
    .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
  return { ok: true };
};

const updateRecipeById = async (id, recipe) =>
  connection()
    .then((db => db.collection('recipes')
      .findOneAndUpdate({
        _id: ObjectId(id)
      },
        { $set: recipe },
        { returnOriginal: false })
    ));

module.exports = {
  findRecipeByName,
  findRecipeById,
  createRecipe,
  listRecipes,
  showOneRecipe,
  updateRecipe,
  deleteRecipe,
  updateRecipeById
};
