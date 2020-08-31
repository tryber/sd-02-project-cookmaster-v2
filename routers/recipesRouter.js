const express = require('express');
const rescue = require('express-rescue');
const { recipesController } = require('../controllers');
const { validateJWT } = require('../middlewares/validateJWT');

const router = express.Router();

router.get('/', recipesController.listRecipes);

router.get(/\/.*[^\/]$/gm, recipesController.listRecipes);

router.use(rescue(validateJWT));

// router.get('/:id/edit', (req, res) => controllers.recipesController.modifyRecipePage(req, res));

// router.get('/:id/delete', (req, res) => controllers.recipesController.deleteRecipePage(req, res));

// router.post('/:id/delete', (req, res) => controllers.recipesController.deleteRecipe(req, res));

// router.get('/search', (req, res) => controllers.recipesController.recipeSearchPage(req, res));

// router.post('/:id', (req, res) => controllers.recipesController.modifyRecipe(req, res));

// router.get('/new', (_req, res) => controllers.recipesController.newRecipesPage(_req, res));


router.post('/', recipesController.createRecipe);

module.exports = router;
