const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
const usersService = require('../service/usersService');

const { jwtSecret } = process.env;

const validateJWT = rescue(async (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    next({ error: true, message: 'Token not found or reported', code: 'unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    const userExists = await usersService.getUserById(decoded.data.id);
    req.user = userExists;
    next();
  } catch (fail) {
    next({ error: true, message: 'Invalid token', code: 'unauthorized' });
  }
});

module.exports = validateJWT;
