const userService = require('../services/userService');

const Boom = require('@hapi/boom');

function handleError(error) {
  if (error === 'invalid-data') {
    throw Boom.badRequest(
      'Dados inválidos',
      error.details.map(({ message }) => message),
    );
  }

  if (error === 'user-not-found') {
    throw Boom.badRequest('Usuário não existe');
  }

  if (error === 'wrong-password') {
    throw Boom.badRequest('Senha incorreta');
  }

  if (error) {
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
