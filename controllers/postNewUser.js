const { user } = require('../services');

const postNewUser = async (req, res, next) => {
  const { error } = await user.newUser(req.body);
  if (error) return next(error);
  return res.status(201).send(true);
};

module.exports = postNewUser;
