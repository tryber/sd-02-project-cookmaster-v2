const express = require('express');
const services = require('../services');
const middlewares = require('../middlewares');

const router = express.Router();

const fields = ['name', 'ingredients', 'preparation'];

router.post(
  '/',
  middlewares.auth,
  middlewares.fieldsValidator(fields),
  async (req, res, next) => {
    const { name, ingredients, preparation } = req.body;
    const { id: authorId } = req.user;

    const {
      success,
      message,
      newRecipe,
    } = await services.recipe.createNew(name, ingredients, preparation, authorId);

    if (!success) return next({ message });

    return res.status(201).json({ message, newRecipe });
  },
);

router.get('/', async (_req, res, next) => {
  const { success, message, recipes } = await services.recipe.showAll();

  if (!success) return next({ message });

  return res.status(200).json({ message, recipes });
});

// const showRecipeDetails = async (req, res) => {
//   const idFromUrl = req.url.split('/')[2];

//   const recipe = await Recipe.getById(idFromUrl);


//   res.render('recipe/details', {
//     recipe,
//     user: req.user,
//     message: null,
//   });
// };

// const editRecipeForm = async (req, res) => {
//   const idFromUrl = req.url.split('/')[2];

//   const recipe = await Recipe.getById(idFromUrl);

//   const { authorId } = recipe;
//   const { id: userId } = req.user;

//   if (authorId !== userId) {
//     return res.redirect('/');
//   }

//   res.render('recipe/form', {
//     recipe,
//     pageTitle: 'Editar Receita',
//     action: `/recipes/${idFromUrl}`,
//   });
// };

// const editRecipe = async (req, res) => {
//   const { title, ingredients, directions } = req.body;

//   const idFromUrl = Number(req.url.split('/')[2]);

//   const recipeBefore = await Recipe.getById(idFromUrl);

//   if (!title || !ingredients || !directions) {
//     return res.render('recipe/details', {
//       recipe: recipeBefore,
//       user: req.user,
//       message: 'Ocorreu um erro na edição da receita, é necessário preencher todos os campos',
//     });
//   }

//   try {
//     await Recipe.editOne({ id: idFromUrl, title, ingredients, directions });

//     const recipeAfter = await Recipe.getById(idFromUrl);

//     res.render('recipe/details', {
//       recipe: recipeAfter,
//       user: req.user,
//       message: 'Receita editada com sucesso!',
//     });
//   } catch (_e) {
//     res.render('recipe/details', {
//       recipe: recipeBefore,
//       user: req.user,
//       message: 'Ocorreu um erro na edição da receita...',
//     });
//   }
// };

// const deleteRecipeForm = async (req, res) => {
//   const idFromUrl = req.url.split('/')[2];

//   const recipe = await Recipe.getById(idFromUrl);

//   const { authorId } = recipe;
//   const { id: userId } = req.user;

//   if (authorId !== userId) {
//     return res.redirect('/');
//   }

//   res.render('recipe/delete', {
//     message: null,
//     action: `/recipes/${idFromUrl}/delete`,
//   });
// };

// const deleteRecipe = async (req, res) => {
//   const { userPassword, body: { password } } = req;

//   const idFromUrl = Number(req.url.split('/')[2]);

//   if (password !== userPassword) {
//     return res.render('recipe/delete', {
//       message: 'Senha incorreta. Por favor, tente novamente',
//       action: `/recipes/${idFromUrl}/delete`,
//     });
//   }

//   const recipesBefore = await Recipe.getAll();

//   try {
//     await Recipe.deleteOne(idFromUrl);

//     const recipesAfter = await Recipe.getAll();

//     res.render('home', {
//       recipes: recipesAfter,
//       user: req.user,
//       message: 'Receita excluída com sucesso!',
//     });
//   } catch (_e) {
//     res.render('home', {
//       recipes: recipesBefore,
//       user: req.user,
//       message: 'Ocorreu um erro na exclusão da receita...',
//     });
//   }
// };

// const searchRecipes = async (req, res) => {
//   const { q } = req.query;

//   const recipes = await Recipe.searchByTitle(q);

//   res.render('recipe/search', {
//     recipes,
//   });
// };

module.exports = router;
