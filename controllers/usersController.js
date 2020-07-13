const { getUsers, validateAndCreateUser } = require('../services/usersService');

const getAllUsers = async (req, res) => {
  const users = await getUsers();
  res.status(200).json({
    users,
  });
};

const createNewCLient = async (req, res, next) => {
  try {
    const newUserInfo = await validateAndCreateUser(req.body);
    if (newUserInfo.error) next({ ...newUserInfo, code: 'invalid_data' });
    const { name, email } = newUserInfo[0];
    res.status(201).json({
      name,
      email,
    });
  } catch (err) {
    next({ code: 'something_wrong', message: 'Algo deu errado' });
  }
};

module.exports = {
  getAllUsers,
  createNewCLient,
};
