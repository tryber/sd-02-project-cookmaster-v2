const jwt = require('jsonwebtoken');

const { loginSchema } = require('./joinSchemas');

const userModel = require('../models/userModel');

const jwtConfig = {
  expiresIn: '3h',
  algorithm: 'HS256',
};

async function login(body) {
  const user = await userModel.find({ email: body.email });

  if (!user) {
    return { error: 'user-not-found', token: null };
  }

  const { password, ...userWithoutPassword } = user;

  if (body.password !== password) {
    return { error: 'wrong-password', token: null };
  }

  const token = jwt.sign({ data: userWithoutPassword }, process.env.JWT_SECRET, jwtConfig);

  return { error: null, token };
}

module.exports = {
  login,
};
