const { userSchema } = require('./joinSchemas');

const userModel = require('../models/userModel');

async function register(body) {
  try {
    const { error, value } = userSchema.validate(body, {
      abortEarly: false,
    });

    if (error) {
      return {
        error: { type: 'invalid-data', details: error.details.map(({ message }) => message) },
      };
    }

    const user = await userModel.find({ email: value.email });

    if (user) {
      return { error: { type: 'exist-user', details: null } };
    }

    await userModel.create(value);

    return { error: { type: null, details: null } };
  } catch (err) {
    throw err;
  }
}

module.exports = {
  register,
};
