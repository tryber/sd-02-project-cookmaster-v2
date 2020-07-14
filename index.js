require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('./controllers');
const middlewares = require('./middlewares');

const { PORT } = process.env;

const app = express();

app.use(bodyParser.json());

app.use('/users', controllers.user);

app.use('/login', controllers.login);

// app.get('/admin', middlewares.auth(), (req, res) => {
//   return res.render('admin/home', { user: req.user });
// });

// app.get('/login', controllers.userController.loginForm);
// app.get('/logout', controllers.userController.logout);
// app.post('/login', controllers.userController.login);

// app.get('/register', controllers.userController.registerForm);
// app.post('/register', controllers.userController.register);

// app.get('/', middlewares.auth(false), recipeController.listRecipes);

// app.get('/recipes/new', middlewares.auth(), recipeController.newRecipeForm);
// app.post('/recipes', middlewares.auth(), recipeController.newRecipe);
// app.get('/recipes/search', recipeController.searchRecipes);
// app.get('/recipes/:id/edit', middlewares.auth(), recipeController.editRecipeForm);
// app.get('/recipes/:id/delete', middlewares.auth(), recipeController.deleteRecipeForm);
// app.post('/recipes/:id/delete', middlewares.auth(), recipeController.deleteRecipe);
// app.get('/recipes/:id', middlewares.auth(false), recipeController.showRecipeDetails);
// app.post('/recipes/:id', middlewares.auth(), recipeController.editRecipe);

app.use(middlewares.boomErrorHandler);

app.use(middlewares.otherErrorsHandler);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
