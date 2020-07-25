const jwt = require('jsonwebtoken');
const { privateKey } = require('../controllers/userController');
const userModel = require('../models/userModel');

const auth = async (req, res, next) => {
  const token = req.headers.Authorization;
  const payload = jwt.verify(token, privateKey);
  const user = await userModel.findByEmail(payload.user.email);
  if (!user) { return res.status(401).json({ message: 'usuário não autorizado' }); };
  req.user = user; 
  next();
}

module.exports = {
  auth,
};
