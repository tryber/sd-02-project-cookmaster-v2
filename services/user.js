const Joi = require('@hapi/joi');
const findByEmail = require('../models/findByEmail');
const postUser = require('../models/postUser');

const objectError = {
  internal: (err) => ({ error: { message: err.message, code: 'internal_error' } }),
  data: (error) => ({ error: { message: error.message, code: 'invalid_data' } }),
  duplicate: (param) => ({ error: { message: `${param} already registered`, code: 'invalid_data' } })
};

const schema = Joi.object({
  name: Joi.string()
    .required(),
  receivedEmail: Joi.string()
    .required(),
  password: Joi.string()
    .required()
});


const newUser = async ({ name, email: receivedEmail, password, role = "user" }) => {
  const { error } = await schema.validate({ name, receivedEmail, password });
  if (error) return objectError.data(error);
  const { email, err } = await findByEmail(receivedEmail).catch((err) => ({ err })) || {};
  if (err) return objectError.internal(err);
  if (email) return objectError.duplicate('E-mail');
  return postUser({ name, email: receivedEmail, password, role }).catch((error) => objectError.internal(error));
};

module.exports = { newUser };
