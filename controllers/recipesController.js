const rescue = require('express-rescue');
const recipesCRUDModel = require('../models/admin/recipesCRUDModel');
const { recipesValidation, recipeIdValidation } = require('../services/inputValidation');
const { MongoError, UserDoesntOwnRecipe } = require('../services/errorObjects');

const getRecipeId = (req) => {
  return { id: String(req.url.match(/[^\/].*[^\/]$/gm))};
}

const checkRecipeAuthority = async (recipeId, userId) => {
  const { recipes: { authorId } } = await recipesCRUDModel.read(recipeId.id);
  if (String(userId) !== String(authorId)) throw new UserDoesntOwnRecipe;
}

const createRecipe = rescue(async (req, res, next) => {
  return recipesValidation.validateAsync(req.body)
    .then(async () => {
      const { id: authorId } = req.user;
      const { body: recipeData } = req;
      const { message, recipe } = await recipesCRUDModel.create(recipeData, authorId);
      res.status(201).send({ message, recipe })
      next();
    })
    .catch((err) => {
      throw new MongoError(err.message, err.status);
    })
});

const listRecipes = rescue(async (req, res, next) => {
  const recipeId = getRecipeId(req);
  return recipeIdValidation.validateAsync(recipeId)
    .then(async () => {
      const { message, recipes } = await recipesCRUDModel.read(recipeId.id);
      return res.status(200).send({ message, recipes })
    })
    .catch((err) => {
      throw new MongoError(err.message, err.status);
    })
});

const modifyRecipe = rescue(async (req, res) => {
  const recipeId = getRecipeId(req);
  const { id: userId } = req.user;
  return recipeIdValidation.validateAsync(recipeId)
    .then(async () => recipesValidation.validateAsync(req.body)
      .then(async () => {
        await checkRecipeAuthority(recipeId, userId);
        const recipesData = { recipeId: recipeId.id, ...req.body };
        const { message } = await recipesCRUDModel.update(recipesData)
        return res.status(200).send({ message });
      }))
    .catch((err) => {
      throw new MongoError(err.message, err.status);
    })
});

const deleteRecipe = rescue(async (req, res) => {
  const { id: userId } = req.user;
  const recipeId = getRecipeId(req)
  return recipeIdValidation.validateAsync(recipeId)
    .then(async() => {
      await checkRecipeAuthority(recipeId, userId);
      const { message } = await recipesCRUDModel.deleteRecipe(recipeId.id);
      return res.status(200).send({ message });
    })
    .catch((err) => {
      throw new MongoError(err.message, err.status);
    });
});

const addRecipeImage = rescue(async(req, res, next) => {
  console.log(req.file)
  return res.send()
});


module.exports = {
  createRecipe,
  listRecipes,
  modifyRecipe,
  deleteRecipe,
  addRecipeImage
};
