const userModel = require('../models/userModel');

async function register(body) {
  try {
    const user = await userModel.find({ email: body.email });

    if (user) {
      return { error: 'exist-user' };
    }

    await userModel.create(body);

    return { error: null };
  } catch (err) {
    throw err;
  }
}

module.exports = {
  register,
};
