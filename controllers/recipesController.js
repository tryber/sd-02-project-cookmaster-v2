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


module.exports = recipesRouter;
