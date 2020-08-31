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

recipesRouter.get('/', async (_req, res) => {
  const allRecipes = await models.getAllRecipes();

  if (!allRecipes.length) {
    return res.status(404).json({ message: 'No recipes in database', code: 'not_found' });
  }

  return res.status(200).json({ status: 'success', recipes: [...allRecipes] });
});

recipesRouter.get('/:id', async (req, res) => {
  const recipe = await models.getById('recipes', Number(req.params.id));
  console.log(recipe);
  if (!recipe.length) {
    return res.status(404).json({ message: 'Id recipe not found in database', code: 'not_found' });
  }

  return res.status(200).json({ status: 'success', recipe: recipe[0] })

});

module.exports = recipesRouter;
