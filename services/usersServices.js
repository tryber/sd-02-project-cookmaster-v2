const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModels');

const secret = process.env.SECRET;

const jwtConfig = {
  expiresIn: '1D',
  algorithm: 'HS256',
};

const newUsers = async (user) => {
  const { email } = user;
  const existUser = await usersModel.findByEmail(email);
  if (existUser) {
    const err = { error: { message: 'User already exists', code: 'Already_exists' } };
    throw err;
  }
  const newUser = await usersModel.newUser(user);
  return newUser;
};

const loginUser = async (user) => {
  const { email, password: keyPass } = user;
  const existUser = await usersModel.findByEmail(email);
  if (!existUser) {
    const err = { error: { message: 'E-mail doesn\'t exist', code: 'Invalid_data' } };
    throw err;
  }
  if (keyPass !== existUser.password) {
    const err = { error: { message: 'Password doens\'t match', code: 'Invalid_data' } };
    throw err;
  }
  const { password, ...noPass } = existUser;
  const token = jwt.sign({ data: noPass }, secret, jwtConfig);
  return token;
};

module.exports = {
  newUsers,
  loginUser,
};
