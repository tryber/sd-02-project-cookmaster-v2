const { ObjectId } = require('mongodb');
const { getAllData, getDataFromField } = require('./utils/getData');
const { addData } = require('./utils/addData');
const { deleteData } = require('./utils/deleteData');
const { updateData } = require('./utils/updateData');

const getAllRecipes = getAllData('recipes');

const getRecipeById = (_id) => getDataFromField('recipes', { _id: new ObjectId(_id) });

const createRecipe = async (body) => addData('recipes', body);

const deleteRecipeId = (_id) => deleteData('recipes', { _id: new ObjectId(_id) });

const updateRecipe = (body, id) => updateData('recipes', { _id: new ObjectId(id) }, body);

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  deleteRecipeId,
  updateRecipe,
};
