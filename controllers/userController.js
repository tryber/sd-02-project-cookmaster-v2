const express = require('express');
const boom = require('boom');
const services = require('../services');
const middlewares = require('../middlewares');

const router = express.Router();

const fields = ['name', 'email', 'password'];

router.post('/', middlewares.fieldsValidator(fields), async (req, res, next) => {
  const { name, email, password } = req.body;

  const {
    success,
    conflict,
    message,
    newUser,
  } = await services.user.register(name, email, password);

  if (conflict) return next(boom.conflict(message));

  if (!success) return next({ message });

  return res.status(201).json({ message, newUser });
});

module.exports = router;
