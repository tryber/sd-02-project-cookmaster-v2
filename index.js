require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const indexControllers = require('./controllers');
const middlewares = require('./middlewares/validateJwt');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.post('/users', indexControllers.usersControllers.getNewUsers);
app.post('/login', indexControllers.usersControllers.loginUser);

app.post('/recipes', middlewares.loginJwt, indexControllers.recipesControllers.newRecipe);
app.get('/recipes', indexControllers.recipesControllers.getAllRecipes);

app.use(indexControllers.errorController);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
