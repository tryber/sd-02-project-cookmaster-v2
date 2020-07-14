const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const secret = 'seusecretdetoken';

const getUserByEmail = (email) =>
  userModel.getUserByEmail(email);

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

const createNewUser = async (newUserData) => {
  const { email } = newUserData;

  const userAlreadyRegistered = await userModel.getUserByEmail(email);

  if (userAlreadyRegistered) return { error: true, code: 409, message: 'Email already registered' };

  const newUser = await userModel.registerNewUser(newUserData);

  const { password, ...userInfo } = newUser;

  return userInfo;
};

module.exports = {
  login,
  getUserByEmail,
  createNewUser,
};
