const { user } = require('../services');

const postNewUser = async (req, res, next) => {
  const { error, name, email } = await user.newUser(req.body);
  if (error) return next(error);
  return res.status(201).send({ name, email });
};

module.exports = postNewUser;
