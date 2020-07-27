const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');
const rescue = require('express-rescue');
const { notFound, badData, exists, unauthorized } = require('./error');

const JWT_SECRET = 'mypassword123';

const auth = rescue(async (req, _res, next) => {
  const token = req.headers.authorization || null;
  const verifyToken = await jwt.verify(token, JWT_SECRET);
  if (!verifyToken) { throw badData; }
  const checkId = await usersModel.findById(verifyToken.data._id);
  if (!checkId) { throw unauthorized; }
  req.user = checkId;
  next();
})


module.exports = {
  auth,
};
