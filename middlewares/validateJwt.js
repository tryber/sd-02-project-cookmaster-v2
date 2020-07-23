const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
const usersModel = require('../models/usersModels');

const secret = process.env.SECRET;

const loginJwt = rescue(async (req, _res, next) => {
  const { authorization: token } = req.headers;
  if (!token) {
    const err = { error: { message: 'Token not found', code: 'Invalid_data' } };
    throw err;
  }
  try {
    const validToken = jwt.verify(token, secret);
    const { data: id } = validToken;
    const userExist = await usersModel.findById(id);
    if (!userExist) {
      const err = { error: { message: 'User does not exist', code: 'Invalid_data' } };
      throw err;
    }
    const { password, ...noPass } = userExist;
    req.user = noPass;
    next();
  } catch (err) {
    const error = { error: { message: err.message, code: 'Unauthorized' } };
    throw error;
  }
});

module.exports = {
  loginJwt,
};
