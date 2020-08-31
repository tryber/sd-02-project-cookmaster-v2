const express = require('express');
const models = require('../models/genericModel');
const middlewares = require('../middlewares');
const JWT = require('jsonwebtoken');

const usersRouter = express.Router();

usersRouter
  .post('/', async (req, res) => {
    const { name, email, password } = req.body;
    const lastUser = await models.getLastData('users');
    const { _id } = lastUser[0];
    const newId = _id + 1 || 1;

    const { code } = await models.insert('users', { _id: newId, name, email, password, role: 'user' });

    if (code) {
      return res.status(409).json({ message: 'email exists in database', code: 'conflict' });
    }

    const newUser = await models.getLastData('users');

    return res.status(201).json({
      message: 'Success',
      user: newUser[0],
      token,
    });
  });

usersRouter.post(
  '/admin',
  middlewares.authUser,
  middlewares.isUserValid,
  async (req, res) => {
    const { role } = JWT.decode(req.headers.authorization);

    if (role !== 'admin') {
      return res.status(403).json({
        message: 'You do not have rights to insert admin on database.',
        code: 'unauthorized',
      });
    }

    const { email } = req.body;

    const existsUser = models.getBy('users', 'email', email);

    if (existsUser.length) {
      return res.status(409).json({
        message: 'user exists in db',
        code: 'conflict',
      });
    }

    const lastUser = await models.getLastData('users');
    const { _id } = lastUser[0];
    const newId = _id + 1 || 1;

    await models.insert('users', { _id: newId, ...req.body, role: 'admin' });

    const { password, ...noPassword } = await models.getLastData('users');

    return res.status(201).json({
      status: 'success',
      user: noPassword,
    })
  });

module.exports = usersRouter;
