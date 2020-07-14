const express = require('express');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');

dotenv.config();

const { errorController } = require('./controllers/errorController');
const usersRoute = require('./routes/usersRoute');
const recipesRoute = require('./routes/recipesRoute');

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', usersRoute);
app.use('/recipes', recipesRoute);

app.use(errorController);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Port: ${port}`);
});
