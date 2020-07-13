const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const JWT_SECRET = 'segredo';

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    const user = await userModel.findOne({ email: payload.data.email });

    if (!user) {
      return res.status(401).json({ message: 'user not found' });
    }

    req.user = user.toObject();

    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  authMiddleware,
};
