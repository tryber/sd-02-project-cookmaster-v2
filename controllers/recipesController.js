const rescue = require('express-rescue');
const recipesService = require('../service/recipesService');
const schemasJoi = require('./schemasJoi');
const errorJoi = require('./errorJoi');

const validateJoi = async (reqInfo) =>
  schemasJoi.addRecipe.validateAsync(reqInfo).catch((fail) => errorJoi(fail));

const createRecipe = rescue(async (req, res, next) => {
  const isValid = await validateJoi(req.body);
  if (isValid.error) return next(isValid);
  const { name, ingredients, preparation } = req.body;
  const { id: userId } = req.user;
  const serviceAnswer = await recipesService
    .createRecipe({ name, ingredients, preparation, userId });
  if (serviceAnswer.error) return next(serviceAnswer);
  res.status(201).json(serviceAnswer);
});

const getAllRecipes = rescue(async (_req, res, next) => {
  const serviceAnswer = await recipesService.getAllRecipes();
  if (serviceAnswer.error) return next(serviceAnswer);
  res.status(200).json(serviceAnswer);
});

const getRecipeById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const serviceAnswer = await recipesService.getRecipeById(id);
  if (serviceAnswer.error) return next(serviceAnswer);
  res.status(200).json(serviceAnswer);
});

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};
