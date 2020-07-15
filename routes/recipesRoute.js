const express = require('express');
const { getAllRecipes, createRecipe, verifyPermissions, updateRecipe,
  getRecipeId, deleteRecipeId, verifyIdMiddleware } = require('../controllers/recipesController');
const { authUser } = require('../controllers/authenticatorController');
const { addImage, saveDB } = require('../controllers/imagesController');

const router = express.Router();

router
  .route('/')
  .get(getAllRecipes)
  .post(authUser, createRecipe);

router
  .route('/:id')
  .get(verifyIdMiddleware, getRecipeId)
  .delete(authUser, verifyIdMiddleware, verifyPermissions, deleteRecipeId)
  .put(authUser, verifyIdMiddleware, verifyPermissions, updateRecipe);

router
  .route('/:id/image')
  .put(authUser, verifyIdMiddleware, verifyPermissions, addImage, saveDB);

module.exports = router;
