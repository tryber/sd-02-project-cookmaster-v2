const { getAllData, getDataFromField } = require('./utils/getData');
const { addData } = require('./utils/addData');

const getAllUsers = getAllData('users');

const getUserByEmail = (email) => getDataFromField('users', { email });

const createUser = async (body, role) => addData('users', { ...body, role });

module.exports = {
  getAllUsers,
  createUser,
  getUserByEmail,
};
