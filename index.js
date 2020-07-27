require('dotenv').config();
const express = require('express');
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');

const validateJWT = require('./middlewares/validateJWT');
const errorController = require('./controllers/errorController');
const usersController = require('./controllers/usersController');
const recipesController = require('./controllers/recipesController');

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, 'uploads'),
  filename: (req, file, callback) => {
    const { id } = req.params;
    const type = file.mimetype.split('/');
    const fileName = `${id}.${type[1]}`;
    callback(null, fileName);
  },
});

const upload = multer({ storage });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.get('/users', usersController.getAllUsers);
app.post('/users', usersController.createUser);

app.post('/login', usersController.loginUser);

app.get('/recipes', recipesController.getAllRecipes);
app.post('/recipes', validateJWT, recipesController.createRecipe);
app.get('/recipes/:id', recipesController.getRecipeById);
app.put('/recipes/:id', validateJWT, recipesController.updateRecipeById);
app.delete('/recipes/:id', validateJWT, recipesController.deleteRecipeById);
app.put(
  '/recipes/:id/image',
  validateJWT,
  recipesController.verifyImageById,
  upload.single('image'),
  recipesController.updateImageById,
);

app.use(errorController.promiseErrors);

app.all('*', errorController.endpointNotFound);

const { PORT } = process.env;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
