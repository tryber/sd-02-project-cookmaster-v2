const { getAllUsers, createUser, getUserByEmail } = require('../models/usersModel');
const { validationNewUser } = require('./utils/schemaValidator');

const getUsers = getAllUsers;

const validateAndCreateUser = async ({ name, email, password }) => {
  const isNotValid = validationNewUser({ name, email, password });
  if (isNotValid.error) return isNotValid;
  const checkEmail = await getUserByEmail(email);
  if (checkEmail.length) return { error: true, message: 'This email already exists' };
  return createUser({ name, email, password }, 'user');
};

module.exports = {
  getUsers,
  validateAndCreateUser,
};
