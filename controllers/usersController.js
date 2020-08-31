const express = require('express');
const userModel = require('../models/genericModel');

const usersRouter = express.Router();

usersRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  const lastUser = await userModel.getLastData('users');
  const { _id } = lastUser[0];
  const newId = _id + 1 || 1;

  const { code } = await userModel.insert('users', { _id: newId, name, email, password, role: 'user' });

  if (code) {
    return res.status(409).json({ message: 'email exists in database', code: 'conflict' });
  }

  const newUser = await userModel.getLastData('users');

  return res.status(201).json({
    message: 'Success',
    user: newUser[0],
    token,
  });
});

module.exports = usersRouter;
