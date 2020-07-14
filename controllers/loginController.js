const express = require('express');
const boom = require('boom');
const services = require('../services');
const middlewares = require('../middlewares');

const router = express.Router();

const fields = ['email', 'password'];

router.post('/', middlewares.fieldsValidator(fields), async (req, res, next) => {
  const { email, password } = req.body;

//   const fields = ['email', 'password'];
//   const data = [email, password];

//   let invalidField = '';
//   let i = 0;

//   while (!invalidField && i < 2) {
//     if (typeof data[i] !== 'string') {
//       invalidField = fields[i];
//     }

//     i += 1;
//   }

//   if (invalidField) return next(boom.badData('Dados inválidos', invalidField));

  const {
    success,
    unauthorized,
    message,
    token,
  } = await services.user.login(email, password);

  if (unauthorized) return next(boom.unauthorized(message));

  if (!success) return next({ message });

  return res.status(200).json({ message, token });
});

module.exports = router;
