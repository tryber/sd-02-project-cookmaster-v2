const express = require('express');
const userModel = require('../models/userModel');

const usersRouter = express.Router();

usersRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  const lastUser = await userModel.getLastData('users');
  const { _id } = lastUser[0];
  const newId = _id + 1 || 1;

  await userModel.insert('users', { _id: newId, name, email, password, role: 'user' });

  const newUser = await userModel.getLastData('users');

  return res.status(201).json({
    message: 'Success',
    user: newUser[0],
  });
});

module.exports = usersRouter;
