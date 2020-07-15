require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const controllers = require('./controllers');
const middlewares = require('./middlewares');

const { PORT } = process.env;

const fields = {
  register: ['name', 'email', 'password'],
  login: ['email', 'password'],
};

const app = express();

app.use(bodyParser.json());

app.post('/users', middlewares.fieldsValidator(fields.register), controllers.user.register);

app.post('/login', middlewares.fieldsValidator(fields.login), controllers.user.login);

app.use('/recipes', controllers.recipe);

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(middlewares.boomErrorHandler);

app.use(middlewares.otherErrorsHandler);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
