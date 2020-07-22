const bcrypt = require('bcrypt');

const userModel = require('../models/userModel');

async function hashPassoword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

async function register(body) {
  try {
    const user = await userModel.find({ email: body.email });

    if (user) {
      return { error: 'exist-user' };
    }

    const hash = await hashPassoword(body.password);

    await userModel.create({ ...body, password: hash });

    return { error: null };
  } catch (err) {
    throw err;
  }
}

module.exports = {
  register,
};
