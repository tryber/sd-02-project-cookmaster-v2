const express = require('express');
const userService = require('../services/userService');

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const createdUser = await userService.createUser({ name, email, password, role: 'user' });

  if (!createdUser) {
    return res.status(500).json({ message: 'internal error', code: 'db_connection_error' });
  }

  return res.status(200).json(createdUser);
});


module.exports = router;
