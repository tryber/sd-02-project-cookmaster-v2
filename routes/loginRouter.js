const express = require('express');

const router = express.Router();

const rescue = require('express-rescue');

const loginController = require('../controllers/loginController');

router.post('/', rescue(loginController.login));

module.exports = router;
