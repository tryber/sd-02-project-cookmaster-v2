const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModels');

const secret = process.env.SECRET;

const loginJwt = async (req, _res, next) => {
  const { authorization: token } = req.headers;
  if (!token) {
    const err = { error: { message: 'Token not found', code: 'Invalid_data' } };
    next(err);
  }
  try {
    const validToken = jwt.verify(token, secret);
    const { data: { _id } } = validToken;
    const userExist = await usersModel.findById(_id);
    if (!userExist) {
      const err = { error: { message: 'User does not exist', code: 'Invalid_data' } };
      next(err);
    }
    const { password, ...noPass } = userExist;
    req.user = noPass;
    next();
  } catch (err) {
    const error = { error: { message: err.message, code: 'Unauthorized' } };
    next(error);
  }
};

module.exports = {
  loginJwt,
};
