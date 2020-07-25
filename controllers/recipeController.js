const express = require('express');
const recipeService = require('../services/recipeService');
const middlewares = require('../middlewares/authMiddleware');
const { json } = require('body-parser');

const router = express.Router();

router.post('/', middlewares.tokenValidation, async (req, res) => {
  const { name, ingredients, preparation } = req.body;

  const isValid = await recipeService.validateRecipe(name, ingredients, preparation);

  if (isValid.error) {
    return res.status(isValid.status).json({
      message: isValid.error,
      code: isValid.code,
    });
  }

  const recipe = {
    name,
    ingredients,
    preparation,
    urlImg: '',
    authorID: req.user._id,
  };

  const createdRecipe = await recipeService.createRecipe(recipe);

  if (!createdRecipe) {
    return res.status(500).json({
      message: 'Erro Interno',
      code: 'db_connection_error',
    });
  }

  return res.status(200).json({
    createdRecipe,
  });
});

router.get('/', async (_req, res) => {
  const recipes = await recipeService.getAllRecipes();

  if (!recipes) {
    return res.status(500).json({
      message: 'Erro Interno',
      code: 'db_connection_error',
    });
  }

  return res.status(200).json({
    recipes,
  });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const recipe = await recipeService.findById(id);

  if (!recipe) {
    return res.status(404).json({
      message: 'Receita não existe',
      code: 'not_found',
    });
  }

  if (recipe.error) {
    return res.status(recipe.status).json({
      message: recipe.error,
      code: recipe.code,
    });
  }

  return res.status(200).json({
    recipe,
  });
});

router.put('/:id', middlewares.tokenValidation, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: authorID, role } = req.user;
  const { id } = req.params;

  const isUpdated = await recipeService.validateUpdate(id, authorID, role);

  if (isUpdated.message) {
    return res.status(isUpdated.status).json({
      message: isUpdated.message,
      code: isUpdated.code,
    });
  }

  const isValid = await recipeService.validateRecipe(name, ingredients, preparation);

  if (isValid.error) {
    return res.status(isValid.status).json({
      message: isValid.error,
      code: isValid.code,
    });
  }

  const newRecipe = {
    name,
    ingredients,
    preparation,
    urlImg: isUpdated.urlImg,
    authorID,
  };

  const updatedRecipe = await recipeService.updateRecipeById(id, newRecipe);

  return res.status(200).json({
    updatedRecipe,
  });

  // const isValidUser = await recipeService.validateRecipeUser(req.user);
});

module.exports = router;
