const rescue = require('express-rescue');
const validJoi = require('../middlewares/validateJoi');
const { schemaNewRecipe } = require('../middlewares/schemasJoi');
const recipesServices = require('../services/recipesServices');

const newRecipe = rescue(async (req, res) => {
  const { ...recipe } = req.body;
  const { user } = req;
  await validJoi.validateJoi(schemaNewRecipe, recipe);
  const createdRecipe = await recipesServices.newRecipe(recipe, user);
  res.status(201).json(createdRecipe);
});

const getAllRecipes = rescue(async (req, res) => {
  const allRecipes = await recipesServices.getAllRecipes();
  res.status(200).json(allRecipes);
});

const findRecipeById = rescue(async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesServices.findRecipeById(id);
  res.status(200).json(recipe);
});

module.exports = {
  newRecipe,
  getAllRecipes,
  findRecipeById,
};
