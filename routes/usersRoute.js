const express = require('express');
const { getAllUsers, createNewCLient } = require('../controllers/usersController');
const { login } = require('../controllers/authenticatorController');

const router = express.Router();

router
  .route('/users')
  .get(getAllUsers)
  .post(createNewCLient);

router
  .route('/login')
  .post(login);

module.exports = router;
