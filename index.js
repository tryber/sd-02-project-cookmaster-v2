require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('./controllers');
const middlewares = require('./middlewares');

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());

app.use('/users', middlewares.isUserValid, controllers.usersRouter);

app.use('/login', middlewares.isLoginValid, controllers.loginController);

app.use('*', (_req, res) => res.status(404).json({ error: 'route not found', code: 'not_found' }));

app.listen(PORT, () => console.log(`Listen on ${PORT}`));
