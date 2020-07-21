const express = require('express');

const router = express.Router();

const rescue = require('express-rescue');

const auth = require('../middlewares/auth');

const recipesController = require('../controllers/recipesController');

router.delete('/:id', auth, rescue(recipesController.remove));

router.get('/', rescue(recipesController.list));

router.get('/:id', rescue(recipesController.find));

router.post('/', auth, rescue(recipesController.create));

router.put('/:id', auth, rescue(recipesController.update));

router.put('/:id/image', auth, rescue(recipesController.upadateImage));

module.exports = router;
