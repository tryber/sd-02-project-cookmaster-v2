const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    const user = await User.getByEmail(payload.user.email);

    if (!user) {
      return res.status(401).json({ message: 'user not found' });
    }

    const { password: _, _id: id, ...userWithoutPasswordAndId } = user;
    req.user = { id, ...userWithoutPasswordAndId };

    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
