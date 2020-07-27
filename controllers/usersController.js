const express = require('express');
const rescue = require('express-rescue');
const usersService = require('../services/usersService');
const { notFound, badData, exists, unauthorized } = require('../middlewares/error');
const { auth } = require('../middlewares/auth');

const router = express.Router();

const checkIntegrity = (name, email, password) => {
  return typeof name === 'string' && name.length !== 0 && typeof email === 'string' && email.length !== 0 && typeof password === 'string' && password.length !== 0;
};

router.post('/', rescue(async (req, res, _next) => {
  console.log(req.body)
  const { name, email, password } = req.body;
  if (!checkIntegrity(name, email, password)) { throw badData; }
  const newUser = await usersService.createUser({ name, email, password });
  if (newUser === 409) { throw exists; }
  return res.status(201).json(newUser);
}));

router.post('/login', rescue(async (req, res) => {
  const { email, password } = req.body;
  const serviceAnswer = await usersService.loginUser({ email, password });
  if (serviceAnswer === 404) { throw notFound };
  if (serviceAnswer === 401) { throw unauthorized };
  res.status(200).json({ token: serviceAnswer });
}));


module.exports = router;