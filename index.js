const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();

const { errorMid, authMiddleware } = require('./middlewares');
const {
  postNewUser, login, postNewRecipe, getRecipes, recipeDetails, recipeEdit, recipeDelete,
} = require('./controllers');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.post('/users', postNewUser);
app.post('/login', login);
app.route('/recipes')
  .post(authMiddleware, postNewRecipe)
  .get(getRecipes);

app.route('/recipes/:id')
  .get(recipeDetails)
  .post(authMiddleware, recipeEdit)
  .delete(authMiddleware, recipeDelete);

app.use('*', (_req, _res, next) => (
  next({ code: 'not_found', message: 'This is a not good option!' })
));

app.use(errorMid);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Port: ${port}`);
});