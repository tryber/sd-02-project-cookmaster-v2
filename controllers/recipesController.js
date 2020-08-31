const rescue = require('express-rescue');
const recipesCRUDModel = require('../models/admin/recipesCRUDModel');
const { recipesValidation, recipeIdValidation } = require('../services/inputValidation');
const { MongoError, UserDoesntOwnRecipe } = require('../services/errorObjects');

const getRecipeId = (req) => {
  return { id: String(req.url.match(/[^\/].*[^\/]$/gm))};
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
      const { recipes: { authorId } } = await recipesCRUDModel.read(recipeId.id);
      if (String(userId) !== String(authorId)) throw new UserDoesntOwnRecipe;
      const recipesData = { recipeId: recipeId.id, ...req.body };
      const { message } = await recipesCRUDModel.update(recipesData)
      return res.status(200).send({ message });
    }))
  .catch((err) => {
    throw new MongoError(err.message, err.status);
  })
});

// const deleteRecipePage = async (req, res) => {
//   const { id: userId } = req.user;
//   const recipeId = Number(req.originalUrl.match(/[0-9]+/g)[0]);
//   const { authorInfo: { authorID } } = await recipesModel.readRecipes(recipeId);
//   if (userId !== authorID) return res.redirect(`/recipes/${recipeId}`);

//   return res.render('admin/deleteRecipe', { message: '', recipeId });
// };

// const deleteRecipe = async (req, res) => {
//   const { id: userId } = req.user;
//   const { body: { deletePassword } } = req;
//   const recipeId = Number(req.originalUrl.match(/[0-9]+/g)[0]);

//   const { redirect } = await recipesCRUDModel.deleteRecipe(recipeId, userId, deletePassword);

//   if (redirect) return res.redirect('/');
//   return res.render('admin/deleteRecipe', { message: 'Senha incorreta. Por favor, tente novamente.', recipeId });
// };

// const recipeSearchPage = async (req, res) => {
//   const { query: { q } } = req;
//   const recipesData = await recipeSearchModels.searchByName(q);
//   return res.render('admin/searchRecipes', { recipesData });
// };

// const fetchMyRecipesPage = async (req, res) => {
//   const { user: { id } } = req;
//   const recipesData = await recipeSearchModels.searchByUserId(id);
//   return res.render('admin/myRecipes', { recipesData });
// };

module.exports = {
  // recipesLandingPage,
  // recipeDetails,
  // newRecipesPage,
  createRecipe,
  listRecipes,
  modifyRecipe,
  // modifyRecipePage,
  // modifyRecipe,
  // deleteRecipePage,
  // deleteRecipe,
  // recipeSearchPage,
  // fetchMyRecipesPage,
};
