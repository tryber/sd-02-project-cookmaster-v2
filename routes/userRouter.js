const express = require('express');

const router = express.Router();

const rescue = require('express-rescue');

const userController = require('../controllers/userController');

router.post('/', rescue(userController.register));

router.post('/admin', rescue(userController.registerAdmin));

module.exports = router;
