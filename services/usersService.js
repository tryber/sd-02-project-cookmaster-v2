const usersModel = require('../models/usersModel');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = 'mypassword123';

const jwtConfig = {
  expiresIn: '300m',
  algorithm: 'HS256',
};

const existsCheck = async (name, id = null) => {
  const modelCall = await usersModel.findUserByName(name, id);
  if (modelCall !== null) { return true; }
  return false;
};

const createUser = async ({ name, email, password }) => {
  if (!existsCheck(name)) { return 409; }
  const createUserModel = await usersModel.createUser({ name, email, password });
  return createUserModel;
};

const loginUser = async ({ email, password }) => {
  const checkEmail = await usersModel.findByEmail(email);
  if (!checkEmail) { return 404; };
  if (checkEmail.password !== password) { return 401; };
  const { password: userPassword, ...restUser } = result;
  const token = jwt.sign({ data: restUser }, JWT_SECRET, jwtConfig);
  return token;
};

module.exports = {
  createUser,
  loginUser
}