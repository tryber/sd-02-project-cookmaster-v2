const express = require('express');
const { getAllUsers, createNewCLient } = require('../controllers/usersController');

const router = express.Router();

router
  .route('/')
  .get(getAllUsers)
  .post(createNewCLient);

module.exports = router;
