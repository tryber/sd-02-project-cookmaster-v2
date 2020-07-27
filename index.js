const express = require('express');
const bodyParser = require('body-parser');
const usersController = require('./controllers/usersController');
// const salesController = require('./controllers/salesController');
const { errorHandler } = require('./middlewares/error');

const app = express();

app.use(bodyParser.json());

app.use('/users', usersController);

app.listen(3001, () => console.log('ouvindo na porta 3000'));

app.use(errorHandler);
