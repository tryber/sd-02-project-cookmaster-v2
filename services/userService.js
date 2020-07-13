const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const secret = 'seusecretdetoken';

const getUserByEmail = (id) =>
  userModel.getUserByEmail(id);

const login = async ({ email, password }) => {
  const user = await userModel.getUserByEmail(email);

  if (!user || user.password !== password) return { error: true, code: 401, message: 'Incorrect username or password' };

  const { password: _, name: __, ...userInfo } = user;

  const jwtConfig = {
    expiresIn: '2h',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: userInfo }, secret, jwtConfig);

  return token;
};

module.exports = {
  login,
  getUserByEmail,
};
