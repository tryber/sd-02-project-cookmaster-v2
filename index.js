require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const validateJWT = require('./middlewares/validateJWT');
const errorController = require('./controllers/errorController');
const usersController = require('./controllers/usersController');
const recipesController = require('./controllers/recipesController');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/users', usersController.getAllUsers);
app.post('/users', usersController.createUser);

app.post('/login', usersController.loginUser);

app.get('/recipes', recipesController.getAllRecipes);
app.post('/recipes', validateJWT, recipesController.createRecipe);
app.get('/recipes/:id', recipesController.getRecipeById);
app.put('/recipes/:id', validateJWT, recipesController.updateRecipeById);

app.use(errorController.promiseErrors);

app.all('*', errorController.endpointNotFound);

// app.use(cookieParser());

// app.set('view engine', 'ejs');
// app.set('views', './views');

// app.get('/', middlewares.auth(false), controllers.recipeController.listRecipeNameAuthors);

// app.get('/recipes/new', middlewares.auth(), controllers.recipeController.newRecipe);
// app.post('/recipes', middlewares.auth(), controllers.recipeController.insertRecipe);

// app.get('/recipes/search', middlewares.auth(), controllers.recipeController.searchRecipe);

// app.get('/recipes/:id/edit', middlewares.auth(), controllers.recipeController.showEditRecipe);
// app.get('/recipes/:id/delete', controllers.recipeController.showDeleteRecipe);
// app.post('/recipes/:id/delete', middlewares.auth(), controllers.recipeController.deleteRecipe);
// app.get('/recipes/:id', middlewares.auth(false), controllers.recipeController.showRecipe);
// app.post('/recipes/:id', middlewares.auth(), controllers.recipeController.editRecipe);

// app.get('/signup', middlewares.auth(false), controllers.userController.newUser);
// app.post('/signup', middlewares.auth(false), controllers.userController.insertUser);

// app.get('/admin', middlewares.auth(), controllers.userController.showAdmin);

// app.get('/login', controllers.userController.loginForm);
// app.get('/logout', controllers.userController.logout);
// app.post('/login', controllers.userController.login);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
