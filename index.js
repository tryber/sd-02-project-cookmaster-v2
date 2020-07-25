const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('./controllers');
const { errorHandler } = require('./middlewares/error');
const auth = require('./middlewares/auth');


const app = express();

app.use(bodyParser.json());

app.post('/users', controllers.userController.addUser);

app.post('/login', controllers.userController.logInUser);

app.post('/recipes', auth, controllers.recipeController.newRecipe)

app.listen(3000, () => console.log('Listening on 3000'));

app.use(errorHandler);
