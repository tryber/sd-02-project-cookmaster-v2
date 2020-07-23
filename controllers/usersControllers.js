const rescue = require('express-rescue');
const validJoi = require('../middlewares/validateJoi');
const usersService = require('../services/usersServices');

const getNewUsers = rescue(async (req, res) => {
  const { ...user } = req.body;
  await validJoi.validateNewUser(user);
  const newUser = await usersService.newUsers(user);
  return res.status(201).json(newUser);
});

const loginUser = rescue(async (req, res) => {
  const { ...user } = req.body;
  await validJoi.validateLogin(user);
  const loggedUser = await usersService.loginUser(user);
  return res.status(200).json({ token: loggedUser });
});

module.exports = {
  getNewUsers,
  loginUser,
};
