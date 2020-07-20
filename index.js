const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');
const multer = require('multer');

dotenv.config();

const { errorMid, authMiddleware } = require('./middlewares');
const {
  postNewUser, login, postNewRecipe, getRecipes, recipeDetails,
  recipeEdit, recipeDelete, verifyImageById, updateImageId,
} = require('./controllers');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, 'uploads'),
  filename: ({ params: { id } }, file, callback) =>
    callback(null, `${id}.${file.mimetype.split('/')[1]}`),
});

const upload = multer({ storage });

app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.post('/users', postNewUser);
app.post('/login', login);
app.route('/recipes')
  .post(authMiddleware, postNewRecipe)
  .get(getRecipes);

app.route('/recipes/:id')
  .get(recipeDetails)
  .put(authMiddleware, recipeEdit)
  .delete(authMiddleware, recipeDelete);

app.put(
  '/recipes/:id/upload',
  authMiddleware,
  verifyImageById,
  upload.single('img'),
  updateImageId,
);

app.use('*', (_req, _res, next) => (
  next({ code: 'not_found', message: 'This is a not good option!' })
));

app.use(errorMid);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Port: ${port}`);
});
