const Boom = require('@hapi/boom');

const recipesModel = require('../models/recipesModel');

async function recipe(req, _res, next) {
  try {
    const recipe = await recipesModel.find({ key: 'id', value: req.params.id });

    if (!recipe) {
      throw Boom.badRequest('Receita não encontrada');
    }

    req.recipe = recipe;

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = recipe;
