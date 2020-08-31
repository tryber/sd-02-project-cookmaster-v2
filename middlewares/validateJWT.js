const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const { TokenNotFound, UserWithTokenIdNotFound, InvalidToken } = require('../services/errorObjects');

const secretKey = process.env.SECRET_KEY;

module.exports = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) throw new TokenNotFound;

  try {
    const decoded = jwt.verify(token, secretKey);

    const user = await userModel.findById(decoded.data._id);

    if (!user) throw new UserWithTokenIdNotFound;

    req.user = user;

    next();
  } catch (err) {
    throw new InvalidToken;
  }
};
