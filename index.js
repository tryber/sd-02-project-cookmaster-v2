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

// app.get('/admin', middlewares.auth(), (req, res) => {
//   return res.render('admin/home', { user: req.user });
// });

// app.get('/recipes/new', middlewares.auth(), controllers.getNewRecipe);
// app.get('/recipes/search', controllers.getSearch);
// app.post('/recipes/:id', middlewares.auth(), controllers.postNewEdit);
// app.get('/recipes/:id/edit', middlewares.auth(), controllers.recipeEdit);
// app.get('/recipes/:id/delete', middlewares.auth(), controllers.recipeDelete);
// app.post('/recipes/:id/delete', middlewares.auth(), controllers.postNewDelete);
// app.get('/recipes/:id', middlewares.auth(false), controllers.recipeDetails);

// app.get('/signup', controllers.getNewUser);
// app.post('/signup', controllers.postNewUser);
// app.get('/', middlewares.auth(false), controllers.recipeController);

// app.get('/login', controllers.userController.loginForm);
// app.get('/logout', controllers.userController.logout);
// app.post('/login', controllers.userController.login);

app.use('*', (_req, _res, next) => (
  next({ code: 'not_found', message: 'This is a not good option!' })
));

app.use(errorMid);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Port: ${port}`);
});