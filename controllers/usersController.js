const { getUsers, validateAndCreateUser } = require('../services/usersService');

const errorSomethingWrong = { code: 'something_wrong', message: 'Something is wrong' };

const getAllUsers = async (req, res) => {
  const users = await getUsers();
  res.status(200).json({
    users,
  });
};

const createNewCLient = async (req, res, next) => {
  try {
    const reqUser = req.user || { role: 'user' };
    const newUserInfo = await validateAndCreateUser({ ...req.body, role: reqUser.role });
    if (newUserInfo.error) next({ ...newUserInfo, code: 'invalid_data' });
    const { name, email } = newUserInfo[0];
    res.status(201).json({
      name,
      email,
    });
  } catch (err) {
    next(errorSomethingWrong);
  }
};

const checkAdmin = async (req, res, next) => {
  const { role } = req.user;
  if (role !== 'admin') next({ message: 'Only admins can do this', code: 'unauthorized' });
  return next();
};

module.exports = {
  getAllUsers,
  createNewCLient,
  checkAdmin,
};
