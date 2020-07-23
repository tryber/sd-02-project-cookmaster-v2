const Joi = require('@hapi/joi');

const schemaNewUser = Joi.object({
  name: Joi.string()
    .min(2)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),
  password: Joi.string()
    .min(5)
    .required(),
});

const schemaLogin = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),
  password: Joi.string()
    .min(5)
    .required(),
});

const validateNewUser = async (obj) => {
  try {
    const val = await schemaNewUser.validateAsync(obj);
    if (val) return true;
  } catch (err) {
    const error = { error: { message: err.details[0].message, code: 'Invalid_data' } };
    throw error;
  }
};

const validateLogin = async (obj) => {
  try {
    const val = await schemaLogin.validateAsync(obj);
    if (val) return true;
  } catch (err) {
    const error = { error: { message: err.details[0].message, code: 'Invalid_data' } };
    throw error;
  }
};

module.exports = {
  validateNewUser,
  validateLogin,
};
