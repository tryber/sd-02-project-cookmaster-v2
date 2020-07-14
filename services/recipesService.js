const { getAllRecipes, getRecipeById, createRecipe } = require('../models/recipesModel');
const { validationFunc } = require('./utils/schemaValidator');

const getRecipes = getAllRecipes;

const getRecipe = async (id) => getRecipeById(id);

const validateAndCreateRecipe = async ({ name, ingredients, preparation }, id) => {
  const isNotValid = validationFunc({ name, ingredients, preparation }, 'recipe');
  if (isNotValid.error) return isNotValid;
  return createRecipe({ name, ingredients, preparation, author: id });
};

module.exports = {
  getRecipes,
  getRecipe,
  validateAndCreateRecipe,
};
