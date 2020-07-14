const express = require('express');
const { getAllRecipes, createRecipe } = require('../controllers/recipesController');
const { authUser } = require('../controllers/authenticatorController');

const router = express.Router();

router
  .route('/')
  .get(authUser, getAllRecipes)
  .post(authUser, createRecipe);

module.exports = router;
