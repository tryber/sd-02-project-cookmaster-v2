const express = require('express');

const router = express.Router();

const rescue = require('express-rescue');

const { loginSchema } = require('../services/joinSchemas');

const middlewares = require('../middlewares');

const loginController = require('../controllers/loginController');

router.post('/', middlewares.validate(loginSchema), rescue(loginController.login));

module.exports = router;
