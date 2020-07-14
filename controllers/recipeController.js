const express = require('express');
const boom = require('boom');
const services = require('../services');
const middlewares = require('../middlewares');

const router = express.Router();

const fields = ['name', 'ingredients', 'preparation'];

router.post(
  '/',
  middlewares.auth,
  middlewares.fieldsValidator(fields),
  async (req, res, next) => {
    const { name, ingredients, preparation } = req.body;
    const { id: authorId } = req.user;

    const {
      success,
      message,
      newRecipe,
    } = await services.recipe.createNew(name, ingredients, preparation, authorId);

    if (!success) return next({ message });

    return res.status(201).json({ message, newRecipe });
  },
);

router.get('/', async (_req, res, next) => {
  const { success, message, recipes } = await services.recipe.showAll();

  if (!success) return next({ message });

  return res.status(200).json({ message, recipes });
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  const { success, notFound, message, recipe } = await services.recipe.showOne(Number(id));

  if (notFound) return next(boom.notFound(message));

  if (!success) return next({ message });

  return res.status(200).json({ message, recipe });
});

router.put(
  '/:id',
  middlewares.auth,
  middlewares.fieldsValidator(fields),
  async (req, res, next) => {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const recipeData = { recipeId: Number(id), name, ingredients, preparation };

    const { id: userId, role } = req.user;
    const userData = { userId, role };

    const {
      success,
      notFound,
      forbidden,
      message,
      updatedRecipe,
    } = await services.recipe.edit(userData, recipeData);

    if (notFound) return next(boom.notFound(message));

    if (forbidden) return next(boom.forbidden(message));

    if (!success) return next({ message });

    return res.status(200).json({ message, updatedRecipe });
  },
);

router.delete(
  '/:id',
  middlewares.auth,
  async (req, res, next) => {
    const { id } = req.params;
    const recipeData = { recipeId: Number(id) };

    const { id: userId, role } = req.user;
    const userData = { userId, role };

    const {
      success,
      notFound,
      forbidden,
      message,
      deletedRecipe,
    } = await services.recipe.remove(userData, recipeData);

    if (notFound) return next(boom.notFound(message));

    if (forbidden) return next(boom.forbidden(message));

    if (!success) return next({ message });

    return res.status(200).json({ message, deletedRecipe });
  },
);

module.exports = router;
