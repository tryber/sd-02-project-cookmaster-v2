const express = require('express');
const boom = require('boom');
const services = require('../services');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { email, password } = req.body;

  const fields = ['email', 'password'];
  const data = [email, password];

//   const invalidData = data.find((fieldData) => typeof fieldData !== 'string');

//   if (invalidData || data.some((fieldData) => fieldData === undefined)) {
//     const invalidField = fields[data.indexOf(invalidData)];
//     return next(boom.badData('Dados inválidos', invalidField));
//   }

  let invalidField = '';
  let i = 0;

  while (!invalidField && i < 2) {
    if (typeof data[i] !== 'string') {
      invalidField = fields[i]
    }

    i += 1;
  }

  if (invalidField) return next(boom.badData('Dados inválidos', invalidField));

  const {
    success,
    unauthorized,
    message,
    token
  } = await services.user.login(email, password);

  if (unauthorized) return next(boom.unauthorized(message));

  if (!success) return next({ message });

  return res.status(200).json({ message, token });
});

module.exports = router;
