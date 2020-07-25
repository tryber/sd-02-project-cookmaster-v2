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

const findById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return { status: 200, error: 'Id inválida', code: 'invalid_data' };
  }
  try {
    const existUser = await connection()
      .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));
    return existUser;
  } catch (err) {
    console.error(err);
    return { status: 500, error: 'Erro interno', code: 'db_connection_error' };
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  findById,
};
