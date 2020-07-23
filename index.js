require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const indexControllers = require('./controllers');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.post('/users', indexControllers.newUsers.getNewUsers);

app.use(indexControllers.errorController);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
