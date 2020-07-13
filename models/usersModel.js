const { getAllData } = require('./utils/getData');

const getAllUsers = getAllData('users');

module.exports = {
  getAllUsers,
};
