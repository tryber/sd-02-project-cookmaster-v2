const express = require('express');
const middlewares = require('../middlewares');
const JWT = require('jsonwebtoken');
const models = require('../models/genericModel');
const { getLastData } = require('../models/genericModel');

const recipesRouter = express.Router();

recipesRouter
  .post(
    '/',
    middlewares.authUser,
    middlewares.existsUser,
    middlewares.isRecipeValid,
    async (req, res) => {
      const { _id: userId } = JWT.decode(req.headers.authorization);

      const recipe = await models.getLastData('recipes');

      const { _id: recipeId } = recipe[0] || [];

      await models.insert('recipes', {
        _id: recipeId + 1 || 1,
        ...req.body,
        userId,
      });

      const insertedRecipe = await getLastData('recipes');

      return res.status(201).json({
        message: 'success',
        recipe: insertedRecipe
      })
    });

recipesRouter
  .get('/', async (_req, res) => {
    const allRecipes = await models.getAllRecipes();

    if (!allRecipes.length) {
      return res.status(404).json({ message: 'No recipes in database', code: 'not_found' });
    }

    return res.status(200).json({ status: 'success', recipes: [...allRecipes] });
  });

recipesRouter
  .get('/:id', async (req, res) => {
    const recipe = await models.getById('recipes', Number(req.params.id));
    if (!recipe.length) {
      return res.status(404).json({ message: 'Id recipe not found in database', code: 'not_found' });
    }

    return res.status(200).json({ status: 'success', recipe: recipe[0] })
  });

recipesRouter
  .put(
    '/:id',
    middlewares.authUser,
    middlewares.existsUser,
    middlewares.isRecipeValid,
    async (req, res) => {
      const { id } = req.params;
      const existsRecipe = await models.getById('recipes', Number(id));

      if (!existsRecipe.length) {
        return res.status(404).json({ message: 'Id recipe not found in database', code: 'not found' });
      }

      const { userId } = existsRecipe[0];
      const { _id, role } = JWT.decode(req.headers.authorization);

      if (role === 'admin' || userId === _id) {
        const { name, ingredients, preparation } = req.body;
        await models.update('recipes', { _id: Number(id) }, { name, ingredients, preparation });

        const changedRecipe = await models.getById('recipes', Number(id));
        return res.status(200).json({ message: 'success', editRecipe: changedRecipe[0] });
      }

      return res.status(403).json({
        message: 'You do not have rights to change another users data.',
        code: 'unauthorized',
      });
    });

recipesRouter
  .delete(
    '/:id',
    middlewares.authUser,
    middlewares.existsUser,
    async (req, res) => {
      const { id } = req.params;
      const recipeToDelete = await models.getById('recipes', Number(id));

      if (!recipeToDelete.length) {
        return res.status(404).json({ message: 'Id recipe not found in database', code: 'not found' });
      }

      const { userId } = recipeToDelete[0];
      const { _id, role } = JWT.decode(req.headers.authorization);

      if (role === 'admin' || userId === _id) {
        await models.deleteOne('recipes', id);
        return res.status(200).json({ message: 'recipe deleted', status: 'success' });
      }

      return res.status(403).json({
        message: 'You do not have rights to delete another users data.',
        code: 'unauthorized',
      });
    });

module.exports = recipesRouter;
