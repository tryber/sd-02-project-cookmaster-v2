const { getAllUsers } = require('../models/usersModel');

const getUsers = getAllUsers;

module.exports = {
  getUsers,
};
