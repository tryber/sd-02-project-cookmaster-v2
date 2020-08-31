const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const { TokenNotFound, UserWithTokenIdNotFound, InvalidToken } = require('../services/errorObjects');

const secretKey = process.env.SECRET_KEY;

const validateJWT = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) throw new TokenNotFound;

  const decoded = jwt.verify(token, secretKey);

  console.log(decoded)

  const user = await userModel.findById(decoded.data.id);

  if (!user) throw new UserWithTokenIdNotFound;

  req.user = user;

  next();
};

module.exports = {
  validateJWT,
}