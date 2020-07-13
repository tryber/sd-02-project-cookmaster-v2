const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

const { jwtSecret } = process.env;

const jwtConfig = {
  expiresIn: '30m',
  algorithm: 'HS256',
};

const getAllUsers = async () => {
  const result = await usersModel.getAllUsers();
  return result;
};

const createUser = async (name, email, password) => {
  const emailExists = await usersModel.getUserByEmail(email).then(Boolean);
  if (emailExists) {
    return { error: true, message: 'This email has already been inserted.', code: 'not_found' };
  }
  const result = await usersModel.createUser(name, email, password);
  return result;
};

const loginUser = async (email, paramPassword) => {
  const result = await usersModel.getUserByEmail(email);
  if (!result) {
    return { error: true, message: 'E-mail not found.', code: 'unauthorized' };
  }
  if (result.password !== paramPassword) {
    return { error: true, message: 'The password does not match.', code: 'unauthorized' };
  }
  const { password: _password, ...restUser } = result;
  const token = jwt.sign({ data: restUser }, jwtSecret, jwtConfig);
  return token;
};

const getUserById = async (id) => {
  const result = await usersModel.getUserById(id);
  if (result === null) {
    return {
      error: true,
      message: 'No user was found with the ID provided',
      code: 'not_found',
    };
  }
  return result;
};

module.exports = {
  getAllUsers,
  createUser,
  loginUser,
  getUserById,
};
