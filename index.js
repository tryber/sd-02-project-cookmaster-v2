const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const connection = require('./models/connections');
const userRoutes = require('./controllers/userController');
const recipesRoutes = require('./controllers/recipeController');
const { loginValidation } = require('./controllers/loginController');

require('dotenv').config();

const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

connection().then(() => {
  console.log('Conectado ao MongoDB');
});

app.post('/login', loginValidation);

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/users', userRoutes);

app.use('/recipes', recipesRoutes);

app.listen(3000, () => console.log('Listening on 3000'));
