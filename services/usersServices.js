const usersModel = require('../models/usersModels');

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

module.exports = {
  newUsers,
};
