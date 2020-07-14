const { getAllData, getDataFromField } = require('./utils/getData');
const { addData } = require('./utils/addData');

const getAllRecipes = getAllData('recipes');

const getRecipeById = (id) => getDataFromField('recipes', { id });

const createRecipe = async (body) => addData('recipes', body);

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
};
