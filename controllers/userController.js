const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const privateKey = 'myprivatekey';
const jwtConfig = {
  expiresIn: '2h',
  algorithm: 'HS256',
};

const { notFound, badData, exists } = require('../middlewares/error');

const addUser = rescue(async (req, res) => {
  const { name, email, password, role } = req.body;
  const addUser = await userService.checkAndAdd({ name, email, password, role });

  return res.status(201).json(addUser);
});

const logInUser = async (req, res) => {
  const { email, password } = req.body;
  const userLogin = await userService.userLogin({ email, password });
  // if (!userLogin) { throw notFound; }
  const user = { email };
  const token = jwt.sign({ user }, privateKey, jwtConfig);
  return res.status(200).json({ token });
}

module.exports = {
  addUser,
  logInUser,
  privateKey,
  jwtConfig,
};
