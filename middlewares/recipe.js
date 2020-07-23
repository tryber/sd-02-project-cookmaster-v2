const Boom = require('@hapi/boom');

const recipesModel = require('../models/recipesModel');

async function recipeMiddleware(req, _res, next) {
  try {
    const recipe = await recipesModel.find({ key: 'id', value: req.params.id });

    if (!recipe) {
      throw Boom.badRequest('Receita não encontrada');
    }

    const { _id: id, ...recipeWithoutId } = recipe;

    req.recipe = { id, ...recipeWithoutId };

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = recipeMiddleware;
