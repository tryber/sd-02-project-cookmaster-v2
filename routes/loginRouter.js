const express = require('express');

const rescue = require('express-rescue');

const router = express.Router();

const middlewares = require('../middlewares');

const loginController = require('../controllers/loginController');

const { loginSchema } = require('../services/joinSchemas');

router.post('/', middlewares.validate(loginSchema), rescue(loginController.login));

module.exports = router;
