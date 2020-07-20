const express = require('express');

const router = express.Router();

const rescue = require('express-rescue');

const recipesController = require('../controllers/recipesController');

router.delete('/:id', rescue(recipesController.remove));

router.get('/', rescue(recipesController.list));

router.get('/:id', rescue(recipesController.find));

router.post('/', rescue(recipesController.create));

router.put('/:id', rescue(recipesController.update));

router.put('/:id/image', rescue(recipesController.upadateImage));

module.exports = router;
