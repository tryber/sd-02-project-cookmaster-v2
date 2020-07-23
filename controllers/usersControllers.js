const rescue = require('express-rescue');
const userValidate = require('../middlewares/validateJoi');
const usersService = require('../services/usersServices');

const getNewUsers = rescue(async (req, res) => {
  const { ...user } = req.body;
  await userValidate.validateNewUser(user);
  const newUser = await usersService.newUsers(user);
  return res.status(201).json(newUser);
});

module.exports = {
  getNewUsers,
};
