const express = require('express');
const bodyParser = require('body-parser');
const usersController = require('./controllers/usersController');
const path = require('path');
const recipesController = require('./controllers/recipesController');
// const salesController = require('./controllers/salesController');
const { errorHandler } = require('./middlewares/error');

const app = express();

app.use(bodyParser.json());

app.use('/users', usersController);

app.use('/recipes', recipesController);

app.listen(3001, () => console.log('ouvindo na porta 3000'));

app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.use(errorHandler);
