const userModel = require('../models/userModel');

async function register(body) {
  try {
    const user = await userModel.find({ email: body.email });

    if (user) {
      return { error: { type: 'exist-user', details: null } };
    }

    await userModel.create(body);

    return { error: { type: null, details: null } };
  } catch (err) {
    throw err;
  }
}

module.exports = {
  register,
};
