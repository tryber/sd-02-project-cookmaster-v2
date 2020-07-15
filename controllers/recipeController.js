const express = require('express');
const boom = require('boom');
const multer = require('multer');
const path = require('path');
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
  middlewares.permissionsValidator,
  middlewares.fieldsValidator(fields),
  async (req, res, next) => {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;

    const {
      success,
      message,
      updatedRecipe,
    } = await services.recipe.edit(Number(id), name, ingredients, preparation);

    if (!success) return next({ message });

    return res.status(200).json({ message, updatedRecipe });
  },
);

router.delete('/:id', middlewares.auth, middlewares.permissionsValidator, async (req, res, next) => {
  const { id } = req.params;

  const {
    success,
    message,
    deletedRecipe,
  } = await services.recipe.remove(Number(id));

  if (!success) return next({ message });

  return res.status(200).json({ message, deletedRecipe });
});

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, 'images');
  },
  filename: (req, _file, callback) => {
    callback(null, req.params.id);
  },
});

const upload = multer({ storage });

router.post(
  '/:id/image/',
  middlewares.auth,
  middlewares.permissionsValidator,
  upload.single('image'),
  async (req, res, next) => {
    if (!req.file || req.file.fieldname !== 'image') {
      return next(boom.badData('Dados inválidos', 'image'));
    }

    const { id: recipeId } = req.params;

    const { success, message, imageUrl } = await services.recipe.addImage(recipeId);

    if (!success) return next({ message });

    return res.status(200).json({ message, imageUrl });
  },
);

module.exports = router;
