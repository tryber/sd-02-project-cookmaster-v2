const express = require('express');

const bodyParser = require('body-parser');

require('dotenv').config();

const middlewares = require('./middlewares');

const routes = require('./routes');

const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/login', routes.loginRouter);

app.use('/recipes', middlewares.auth, routes.recipesRouter);

app.use('/users', routes.userRouter);

app.use(middlewares.error);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
