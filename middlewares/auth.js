const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.getUserByEmail(payload.data.email);

    if (!user) {
      return res.status(401).json({ message: 'user not found' });
    }

    const { password, ...userInfo } = user;

    req.user = userInfo;

    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  authMiddleware,
};
