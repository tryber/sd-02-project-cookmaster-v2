const usersModel = require('../models/usersModel');

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

module.exports = {
  getAllUsers,
  createUser,
};
