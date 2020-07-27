const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const findByEmail = require('../models/findByEmail');
const postUser = require('../models/postUser');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const objectError = {
  internal: (err) => ({ error: { message: err.message, code: 'internal_error' } }),
  data: (error) => ({ error: { message: error.message, code: 'invalid_data' } }),
  duplicate: (param) => ({ error: { message: `${param} already registered`, code: 'invalid_data' } }),
  unauthorized: (message) => ({ error: { message, code: 'unauthorized' } }),
};

const schema = Joi.object({
  name: Joi.string()
    .required(),
  receivedEmail: Joi.string()
    .required(),
  password: Joi.string()
    .required(),
});


const newUser = async ({ name, email: receivedEmail, password, role = 'user' }) => {
  const { error } = await schema.validate({ name, receivedEmail, password });
  if (error) return objectError.data(error);
  const { email, err: newError } = await findByEmail(receivedEmail).catch((err) => ({ err })) || {};
  if (newError) return objectError.internal(newError);
  if (email) return objectError.duplicate('E-mail');
  return postUser({ name, email: receivedEmail, password, role })
    .then((results) => ({ ...results }))
    .catch((catchError) => objectError.internal(catchError));
};

const loginUser = async ({ email, password }) => {
  const result = await findByEmail(email);
  if (Object.values(result).length === 0) {
    return objectError.unauthorized('E-mail not found.');
  }
  if (result.password !== password) {
    return objectError.unauthorized('The password does not match.');
  }
  const { password: _password, name: _name, ...restUser } = result;
  const token = jwt.sign({ data: restUser }, process.env.jwtSecret, jwtConfig);
  return { token };
};

module.exports = { newUser, loginUser };
