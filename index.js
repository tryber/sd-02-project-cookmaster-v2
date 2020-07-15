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
app.delete('/recipes/:id', validateJWT, recipesController.deleteRecipeById);

app.use(errorController.promiseErrors);

app.all('*', errorController.endpointNotFound);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
