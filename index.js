require('dotenv').config();

const express = require('express');
const rescue = require('express-rescue');
const cookieParser = require('cookie-parser');
const path = require('path');
const { validateJWT } = require('./middlewares');
const { userController, registrationController } = require('./controllers');
const recipesRouter = require('./routers/recipesRouter');
const { MongoError, UserNotFound, RecipesNotFound, UserAlreadyExists, TokenNotFound, UserWithTokenIdNotFound, InvalidToken, FailedToSave, FailedToSaveRecipe, UserDoesntOwnRecipe, FailedToDeleteRecipe, FileNotAttached, ImageNotUploaded, AdminRightsRequired } = require('./services/errorObjects');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.json());
app.use(cookieParser());

app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.use('/recipes', recipesRouter);

app.post('/login', userController.login);

app.post('/users', registrationController.registerUser);

app.post('/users/admin', rescue(validateJWT), registrationController.registerAdmin);

app.use(rescue.from(UserNotFound, (err, req, res, next) => {
  const { message, status } = err;
  res.status(status).send({ error: { message, code: status } });
  next();
}));

app.use(rescue.from(RecipesNotFound, (err, req, res, next) => {
  const { message, status } = err;
  res.status(status).send({ error: { message, code: status } });
  next();
}));

app.use(rescue.from(UserAlreadyExists, (err, req, res, next) => {
  const { message, status } = err;
  res.status(status).send({ error: { message, code: status } });
  next();
}));

app.use(rescue.from(TokenNotFound, (err, req, res, next) => {
  const { message, status } = err;
  res.status(status).send({ error: { message, code: status } });
  next();
}));

app.use(rescue.from(UserDoesntOwnRecipe, (err, req, res, next) => {
  const { message, status } = err;
  res.status(status).send({ error: { message, code: status } });
  next();
}));

app.use(rescue.from(FileNotAttached, (err, req, res, next) => {
  const { message, status } = err;
  res.status(status).send({ error: { message, code: status } });
  next();
}));

app.use(rescue.from(ImageNotUploaded, (err, req, res, next) => {
  const { message, status } = err;
  res.status(status).send({ error: { message, code: status } });
  next();
}));

app.use(rescue.from(UserWithTokenIdNotFound, (err, req, res, next) => {
  const { message, status } = err;
  res.status(status).send({ error: { message, code: status } });
  next();
}));

app.use(rescue.from(AdminRightsRequired, (err, req, res, next) => {
  const { message, status } = err;
  res.status(status).send({ error: { message, code: status } });
  next();
}));

app.use(rescue.from(InvalidToken, (err, req, res, next) => {
  const { message, status } = err;
  res.status(status).send({ error: { message, code: status } });
  next();
}));

app.use(rescue.from(FailedToDeleteRecipe, (err, req, res, next) => {
  const { message, status } = err;
  res.status(status).send({ error: { message, code: status } });
  next();
}));

app.use(rescue.from(FailedToSave, (err, req, res, next) => {
  const { message, status } = err;
  res.status(status).send({ error: { message, code: status } });
  next();
}));

app.use(rescue.from(FailedToSaveRecipe, (err, req, res, next) => {
  const { message, status } = err;
  res.status(status).send({ error: { message, code: status } });
  next();
}));

app.use(rescue.from(MongoError, (err, req, res, next) => {
  const { message, status } = err;
  res.status(status).send({ error: { message, code: status } });
  next();
}));

app.use((err, req, res, _next) => {
  const { message } = err;
  res.status(500).send({ error: { message, code: 500 } });
});

app.listen(3000, () => console.log(`Listening on ${process.env.PORT}`));
