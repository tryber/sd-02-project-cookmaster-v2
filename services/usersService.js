const { getAllUsers, createUser, getUserByEmail } = require('../models/usersModel');
const { validationFunc } = require('./utils/schemaValidator');

const getUsers = getAllUsers;

const getUser = async (email) => getUserByEmail(email);

const validateAndCreateUser = async ({ name, email, password, role }) => {
  const isNotValid = validationFunc({ name, email, password }, 'user');
  if (isNotValid.error) return isNotValid;
  const checkEmail = await getUserByEmail(email);
  if (checkEmail.length) return { error: true, message: 'This email already exists' };
  return createUser({ name, email, password, role });
};

module.exports = {
  getUsers,
  validateAndCreateUser,
  getUser,
};
