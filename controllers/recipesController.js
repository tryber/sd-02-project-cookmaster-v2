const rescue = require('express-rescue');
const recipesCRUDModel = require('../models/admin/recipesCRUDModel');
const { recipesValidation, recipeIdValidation } = require('../services/inputValidation');
const { MongoError } = require('../services/errorObjects');



// const recipesLandingPage = async (req, res) => {
//   const recipesData = await recipesModel.readRecipes();
//   return res.render('home', { recipesData, userLogged: !!req.user });
// };

// const recipeDetails = async (req, res) => {
//   const recipeID = Number(req.originalUrl.match(/[0-9]+/g)[0]);
//   const recipeData = await recipesModel.readRecipes(recipeID);
//   if (!recipeData) return res.render('404');

//   const {
//     id, name, description, authorInfo, ingredients,
//   } = recipeData;

//   return res.render('recipeDetails', { user: req.user, authorInfo, recipe: { id, name, description, ingredients } });
// };

// const newRecipesPage = async (_req, res) => res.render('admin/newRecipe', { message: '', redirect: false });

const createRecipe = rescue(async (req, res, next) => {
  await recipesValidation.validateAsync(req.body)
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
  const recipeID = { id: String(req.url.match(/[^\/].*[^\/]$/gm))};
  console.log(recipeID)
  await recipeIdValidation.validateAsync(recipeID)
    .then(async () => {
      const { message, recipes } = await recipesCRUDModel.read(recipeID.id);
      res.status(201).send({ message, recipes })
      next();
    })
    .catch((err) => {
      throw new MongoError(err.message, err.status);
    })
});

// const modifyRecipePage = async (req, res) => {
//   const { id: userId } = req.user;
//   const recipeID = Number(req.originalUrl.match(/[0-9]+/g)[0]);
//   const recipeData = await recipesModel.readRecipes(recipeID);
//   console.log(recipeData)
//   if (!recipeData) return res.render('404').status(404);

//   const {
//     id, name, description, authorInfo, ingredients,
//   } = recipeData;

//   if (userId !== authorInfo.authorID) return res.redirect('/');

//   return res.render('admin/editRecipe', { user: req.user, authorInfo, recipe: { id, name, description, ingredients } });
// };

// const modifyRecipe = async (req, res) => {
//   const { id: userId } = req.user;
//   const id = Number(req.originalUrl.match(/[0-9]+/g)[0]);

//   const { authorInfo: { authorID } } = await recipesModel.readRecipes(id);
//   if (userId !== authorID) return res.redirect(`/recipes/${id}`);

//   const { body } = req;
//   const recipeData = { id, ...body };
//   await recipesCRUDModel.updateRecipe(recipeData);
//   return setTimeout(() => res.redirect(`/recipes/${id}`), 3000);
// };

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
  // modifyRecipePage,
  // modifyRecipe,
  // deleteRecipePage,
  // deleteRecipe,
  // recipeSearchPage,
  // fetchMyRecipesPage,
};
