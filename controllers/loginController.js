const express = require('express');
const services = require('../services');

const loginRouter = express.Router();

loginRouter.post('/', async (req, res) => {
  res.json({ message: 'Chegou' })
});

module.exports = loginRouter;
