const express = require('express');
const userService = require('../services/userService');

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const isValid = await userService.validateLogin(name, email, password);

  if (isValid.error) {
    return res.status(isValid.status).json({ message: isValid.error, code: isValid.code });
  }

  const createdUser = await userService.createUser({ name, email, password, role: 'user' });

  if (!createdUser) {
    return res.status(500).json({ message: 'Erro interno', code: 'db_connection_error' });
  }

  return res.status(200).json(createdUser);
});

module.exports = router;
