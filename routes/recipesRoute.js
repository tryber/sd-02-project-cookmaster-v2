const express = require('express');
const { getAllRecipes, createRecipe, verifyPermissions,
  getRecipeId, deleteRecipeId, verifyIdMiddleware } = require('../controllers/recipesController');
const { authUser } = require('../controllers/authenticatorController');

const router = express.Router();

router
  .route('/')
  .get(getAllRecipes)
  .post(authUser, createRecipe);

router
  .route('/:id')
  .get(verifyIdMiddleware, getRecipeId)
  .delete(authUser, verifyIdMiddleware, verifyPermissions, deleteRecipeId);

module.exports = router;
