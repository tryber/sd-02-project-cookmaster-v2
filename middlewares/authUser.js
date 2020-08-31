require('dotenv').config();
const JWT = require('jsonwebtoken');
const models = require('../models/genericModel');

const verifyJWT = (token) =>
  JWT.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return err;
    return decoded;
  });

const authUser = (req, res, next) => {
  const { headers } = req;
  if (!headers.authorization) {
    return res.status(401).json({
      message: 'Token Not exists in Headers.Authorization',
      code: 'Unauthorized'
    });
  }

  const data = verifyJWT(headers.authorization);

  if (data.message) {
    return res.status(401).json({ message: data.message, code: 'Unauthorized' });
  }

  return next();
};

const existsUser = async (req, res, next) => {
  const { email } = JWT.decode(req.headers.authorization);
  const confirmEmail = await models.getBy('users', 'email', email);

  if (!confirmEmail.length) {
    return res.status(404).json({
      message: 'User not exists in db',
      code: 'not_found',
    });
  }
  return next();
};

module.exports = {
  authUser,
  existsUser,
}
