const { user } = require('../services');

const login = async (req, res, next) => {
  const { token, error } = await user.loginUser(req.body);
  if (error) return next(error);
  return res.status(200).json({ token });
};

module.exports = login;
