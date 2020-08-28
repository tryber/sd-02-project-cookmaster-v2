const express = require('express');

const usersRouter = express.Router();

usersRouter.post('/', (req, res) => {
  const { name, email, password } = req.body;
  return res.status(200).json({ name, email, password })
});

module.exports = usersRouter;
