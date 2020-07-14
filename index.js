const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const middlewares = require('./middlewares');
const recipeController = require('./controllers/recipeController');
const userController = require('./controllers/userController');

const app = express();

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '/uploads')));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/users', userController.newUser);

app.post('/login', userController.login);

app.route('/recipes')
  .get(recipeController.listRecipes)
  .post(middlewares.auth, recipeController.newRecipe);

app.route('/recipes/:id')
  .get(recipeController.showRecipe)
  .put(middlewares.auth, recipeController.editRecipe)
  .delete(middlewares.auth, recipeController.deleteRecipe);

app.post('/recipes/:id/image', middlewares.auth, recipeController.editRecipe);

// app.post('users/admin', middlewares.auth, userController.newAdmin);

app.all('*', (error, _req, res, _next) => res.json(error).status(500));

app.listen(3000, () => console.log('Listening on 3000'));
