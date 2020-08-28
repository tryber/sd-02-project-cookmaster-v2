const express = require('express');

const usersRouter = express.Router();

usersRouter.post('/', (req, res) => {
  const { name, email, password } = req.body;
  
});

module.exports = usersRouter;
