const express = require('express');
const { getAllUsers, createNewCLient, checkAdmin } = require('../controllers/usersController');
const { login, authUser } = require('../controllers/authenticatorController');

const router = express.Router();

router
  .route('/users')
  .get(getAllUsers)
  .post(createNewCLient);

router
  .route('/users/admin')
  .post(authUser, checkAdmin, createNewCLient);

router
  .route('/login')
  .post(login);

module.exports = router;
