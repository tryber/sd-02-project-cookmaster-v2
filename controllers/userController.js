const userService = require('../services/userService');

const Boom = require('@hapi/boom');

function handleError(error) {
  const { type, details } = error;

  if (type === 'invalid-data') {
    throw Boom.badRequest('Dados inválidos', details);
  }

  if (type === 'user-not-found') {
    throw Boom.badRequest('Usuário não existe');
  }

  if (type === 'wrong-password') {
    throw Boom.badRequest('Senha incorreta');
  }

  if (type === 'server-error') {
    throw Boom.badImplementation('Error Interno no Servidor');
  }
}

async function login(req, res) {
  const { error, token } = await userService.login(req.body);

  handleError(error);

  res.status(201).json({ token });
}

module.exports = {
  login,
};
