const rescue = require('express-rescue');
const usersService = require('../service/usersService');
const schemasJoi = require('./schemasJoi');
const errorJoi = require('./errorJoi');

const validateJoi = async (reqInfo) =>
  schemasJoi.addUser.validateAsync(reqInfo).catch((fail) => errorJoi(fail));

const getAllUsers = rescue(async (_req, res, next) => {
  const serviceAnswer = await usersService.getAllUsers();
  if (serviceAnswer.error) return next(serviceAnswer);
  res.status(200).json(serviceAnswer);
});

const createUser = rescue(async (req, res, next) => {
  const isValid = await validateJoi(req.body);
  if (isValid.error) return next(isValid);
  const { name, email, password } = req.body;
  const serviceAnswer = await usersService.createUser(name, email, password);
  if (serviceAnswer.error) return next(serviceAnswer);
  res.status(201).json(serviceAnswer);
});

const loginUser = rescue(async (req, res, next) => {
  const { email, password } = req.body;
  const serviceAnswer = await usersService.loginUser(email, password);
  if (serviceAnswer.error) return next(serviceAnswer);
  res.status(200).json({ token: serviceAnswer });
});

module.exports = {
  getAllUsers,
  createUser,
  loginUser,
};
