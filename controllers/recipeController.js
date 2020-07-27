const express = require('express');
const multer = require('multer');
const recipeService = require('../services/recipeService');
const middlewares = require('../middlewares/authMiddleware');

const router = express.Router();

const storage = multer.diskStorage({
  destination: 'images/',
  filename: (req, file, cb) => {
    const fileType = file.mimetype.split('/')[1];
    cb(null, `${req.params.id}.${fileType}`);
  },
});

const upload = multer({ storage });

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
});

router.put('/:id/image',
  middlewares.tokenValidation,
  upload.single('image'),
  async (req, res) => {
    const { id } = req.params;
    const { _id: authorID, role } = req.user;

    const isAuthorValid = await recipeService.validateUpdate(id, authorID, role);

    if (isAuthorValid.message) {
      return res.status(isAuthorValid.status).json({
        message: isAuthorValid.message,
        code: isAuthorValid.code,
      });
    }

    const newUrl = `localhost:3000/images/${req.file.filename}`;
    const newRecipe = { ...isAuthorValid, urlImg: newUrl };
    const updatedRecipe = await recipeService.updateRecipeById(id, newRecipe);

    return res.status(200).json({
      updatedRecipe,
    });
  });

module.exports = router;
