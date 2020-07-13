const express = require('express');
const { getAllUsers } = require('../controllers/usersController');

const router = express.Router();

router
  .route('/')
  .get(getAllUsers);

module.exports = router;
