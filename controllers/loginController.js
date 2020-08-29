const express = require('express');
const services = require('../services');
const models = require('../models/userModel');

const loginRouter = express.Router();

loginRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const dbUser = await models.getBy('users', 'email', email);

  if (!dbUser.length) {
    return res.status(404).json({
      error: 'Email not exists in database',
      code: 'not_found',
    });
  }

  const {
    _id,
    role,
    password: dbPassword,
  } = dbUser[0];

  if (password !== dbPassword) {
    return res.status(403).json({ error: 'incorrect password', code: 'Forbidden' });
  }

  const token = services.generateToken({ _id, email, role });

  return res.status(200).json({ message: 'success', data: { _id, role, email, token } });
});

module.exports = loginRouter;
