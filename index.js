const express = require('express');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');

dotenv.config();

const usersRoute = require('./routes/usersRoute');

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', usersRoute);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Port: ${port}`);
});
