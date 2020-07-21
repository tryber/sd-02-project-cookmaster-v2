const express = require('express');

const multer = require('multer');

const rescue = require('express-rescue');

const router = express.Router();

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (_req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

const auth = require('../middlewares/auth');

const recipesController = require('../controllers/recipesController');

router.delete('/:id', auth, rescue(recipesController.remove));

router.get('/', rescue(recipesController.list));

router.get('/:id', rescue(recipesController.find));

router.post('/', auth, rescue(recipesController.create));

router.put('/:id', auth, rescue(recipesController.update));

router.put('/:id/image', auth, upload.single('image'), rescue(recipesController.upadateImage));

module.exports = router;
