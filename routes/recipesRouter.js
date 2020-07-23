const express = require('express');

const multer = require('multer');

const rescue = require('express-rescue');

const { recipesSchema } = require('../services/joinSchemas');

const middlewares = require('../middlewares');

const router = express.Router();

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, callback) => {
    callback(null, `${req.recipe.id}.${file.mimetype.split('/')[1]}`);
  },
});

const upload = multer({ storage });

const recipesController = require('../controllers/recipesController');

router.delete(
  '/:id',
  middlewares.auth,
  middlewares.recipe,
  middlewares.user,
  rescue(recipesController.remove),
);

router.get('/', rescue(recipesController.list));

router.get('/:id', middlewares.recipe, (req, res) => {
  res.status(200).json({ recipe: req.recipe });
});

router.post(
  '/',
  middlewares.auth,
  middlewares.validate(recipesSchema),
  rescue(recipesController.create),
);

router.put(
  '/:id',
  middlewares.auth,
  middlewares.validate(recipesSchema),
  middlewares.recipe,
  middlewares.user,
  rescue(recipesController.update),
);

router.put(
  '/:id/image',
  middlewares.auth,
  middlewares.recipe,
  middlewares.user,
  upload.single('image'),
  rescue(recipesController.upadateImage),
);

module.exports = router;
