require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const middlewares = require('./middlewares');
const controllers = require('./controllers');

const app = express();
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, setFileName) => {
    const mimetype = file.mimetype.replace(/image\//, '');
    console.log(mimetype)
    return setFileName(null, `${req.params.id}.${mimetype}`);
  },
});

const upload = multer({ storage });


app.post('/login', controllers.users.login);

app.post('/users', controllers.users.register);

app.get('/recipes', controllers.recipes.getAll);
app.post('/recipes', middlewares.auth, controllers.recipes.add);

app.get('/recipes/:id', controllers.recipes.getById);
app.put('/recipes/:id', middlewares.auth, controllers.recipes.edit);
app.delete('/recipes/:id', middlewares.auth, controllers.recipes.del);

app.post('/recipes/:id/image', middlewares.auth, upload.single('image'), controllers.recipes.addImage);
app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.listen(5000, () => console.log('Listening on 5000'));


// {
//   "name": "Jeijoado",
//   "ingredients": "jeijão e limão",
//   "preparation": "chacoalha tudo"
// }