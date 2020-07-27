const rescue = require('express-rescue');
const recipesService = require('../services/recipesService');
const { notFound } = require('../middlewares/error');

const verifyImage = async (req, res, next) => {
  const { params: { id } } = req;
  const findRecipe = await recipesService.showOneRecipe(id);
  if (findRecipe === 404) { throw notFound }
  next();
};

module.exports = verifyImage;
