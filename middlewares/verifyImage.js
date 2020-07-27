const rescue = require('express-rescue');
const recipesService = require('../services/recipesServices');
const { notFound } = require('../middlewares/error');

const verifyImage = rescue(async (req, res, next) => {
  const { params: { id } } = req;
  const findRecipe = await recipesService.findRecipeById(id);
  if (findRecipe === 404) { throw notFound }
  next();
});

module.exports = verifyImage;
