const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const middlewares = require('./middlewares');
const recipeController = require('./controllers/recipeController');
const userController = require('./controllers/userController');

const app = express();

app.use('/images', express.static(__dirname + '/uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', middlewares.auth(false), recipeController.listRecipes);

app.get('/recipes/new', middlewares.auth(), recipeController.newRecipeForm);
app.post('/recipes/new', middlewares.auth(), recipeController.newRecipe);

app.get(
  '/recipes/search',
  middlewares.auth(false),
  recipeController.searchRecipePage,
  recipeController.searchRecipe,
);

app.get('/recipes/:id', middlewares.auth(false), recipeController.showRecipe);

app.get('/recipes/:id/edit', middlewares.auth(), recipeController.editRecipeForm);
app.post('/recipes/:id/edit', middlewares.auth(), recipeController.editRecipe);

app.get('/recipes/:id/delete', middlewares.auth(), recipeController.deleteRecipeForm);
app.post('/recipes/:id/delete', middlewares.auth(), recipeController.deleteRecipe);

app.get('/me/recipes', middlewares.auth(), recipeController.showUserRecipes);
app.get('/me/edit', middlewares.auth(), userController.editUserForm);
app.post('/me/edit', middlewares.auth(), userController.editUser);

app.get('/admin', middlewares.auth(), (req, res) => res.render('admin/home', { user: req.user }));

app.get('/login', userController.loginForm);
app.get('/logout', userController.logout);
app.post('/login', userController.login);

app.get('/signup', userController.registerForm);
app.post('/signup', userController.newUser);

app.listen(3000, () => console.log('Listening on 3000'));
