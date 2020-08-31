const rescue = require('express-rescue');
const { UserNotFound, MongoError } = require('../services/errorObjects')
const userModel = require('../models/userModel');
const { loginValidation } = require('../services/validation');
const jwt = require('jsonwebtoken');

const login = rescue(async (req, res) => {
  await loginValidation.validateAsync(req.body)
  .then(async () => {
    const { email, password } = req.body;

    if (!email || !password) throw new UserNotFound;

    const user = await userModel.findByEmail(email);

    if (!user) throw new UserNotFound;

    const jwtConfig = {
      expiresIn: '30m',
      algorithm: 'HS256',
    };

    const { id, role } = user;

    const token = jwt.sign({ data: user }, process.env.SECRET_KEY, jwtConfig);

    res.status(200).json({ user: { id, email, role }, token, expires: jwtConfig.expiresIn });
  })
  .catch((err) => {
    throw new MongoError(err.message, err.status);
  })
});


const logout = (req, res) => {
  res.clearCookie('token');
  if (!req.cookies || !req.cookies.token) return res.redirect('/login');
  res.render('admin/logout');
};

module.exports = {
  login,
  logout,
};
