const express = require('express');
const multer = require('multer');
const rescue = require('express-rescue');
const { recipesController } = require('../controllers');
const { validateJWT, storage } = require('../middlewares');

const upload = multer({ storage });

const router = express.Router();

router.get('/', recipesController.listRecipes);

router.get(/\/.*[^\/]$/gm, recipesController.listRecipes);

router.use(rescue(validateJWT));

router.put('/:id', recipesController.modifyRecipe);

router.delete('/:id', recipesController.deleteRecipe)

router.post('/', recipesController.createRecipe);

router.post('/:id/images', upload.single('image'), recipesController.addRecipeImage);

module.exports = router;
