const express = require('express');

const router = express.Router();

const rescue = require('express-rescue');

const { userSchema } = require('../services/joinSchemas');

const middlewares = require('../middlewares');

const userController = require('../controllers/userController');

router.post('/', rescue(middlewares.validate(userSchema)), rescue(userController.register));

router.post(
  '/admin',
  rescue(middlewares.validate(userSchema)),
  rescue(userController.registerAdmin),
);

module.exports = router;
