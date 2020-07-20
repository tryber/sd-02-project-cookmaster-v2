const jwt = require('jsonwebtoken');

const { loginSchema } = require('./joinSchemas');

const userModel = require('../models/userModel');

const jwtConfig = {
  expiresIn: '10m',
  algorithm: 'HS256',
};

async function login(body) {
  try {
    const { error, value } = loginSchema.validate(body, {
      abortEarly: false,
    });

    if (error) {
      return {
        error: { type: 'invalid-data', details: error.details.map(({ message }) => message) },
      };
    }

    const user = await userModel.find({ email: value.email });

    if (!user) {
      return { error: { type: 'user-not-found' } };
    }

    const { password, ...userWithoutPassword } = user;

    if (value.password !== password) {
      return { error: { type: 'wrong-password' } };
    }

    const token = jwt.sign({ data: userWithoutPassword }, process.env.JWT_SECRET, jwtConfig);

    return { token };
  } catch (err) {
    throw err;
  }
}

module.exports = {
  login,
};
