const express = require('express');
const bodyParser = require('body-parser');

const connection = require('./models/connections');
const userRoutes = require('./controllers/userController');
const { loginValidation } = require('./controllers/loginController');

const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

connection().then(() => {
  console.log('Conectado ao MongoDB');
});

app.post('/login', loginValidation);

app.use('/users', userRoutes);

app.listen(3000, () => console.log('Listening on 3000'));
