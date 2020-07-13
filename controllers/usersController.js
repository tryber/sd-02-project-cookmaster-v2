const { getUsers } = require('../services/usersService');

const getAllUsers = async (req, res) => {
  const users = await getUsers();
  res.status(200).json({
    users,
  });
};

module.exports = {
  getAllUsers,
};
