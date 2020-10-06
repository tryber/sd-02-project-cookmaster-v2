const jwt = require('jsonwebtoken');
const findById = require('../models/findById');

const { jwtSecret } = process.env;

const authMiddleware = async (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next({ message: 'Token not found or reported', code: 'unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = await findById(decoded.data);
    const { _id: userId } = req.user;
    req.user.id = userId;
    if (Object.values(req.user).length === 0) next({ message: 'User not found', code: 'unauthorized' });
    next();
  } catch (error) {
    next({ message: error.message, code: 'unauthorized' });
  }
};

module.exports = authMiddleware;
