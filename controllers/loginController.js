const loginService = require('../services/loginService');

const Boom = require('@hapi/boom');

function handleError(error) {
  if (error === 'user-not-found') {
    throw Boom.badRequest('Usuário não existe');
  }

  if (error === 'wrong-password') {
    throw Boom.badRequest('Senha incorreta');
  }
}

async function login(req, res) {
  const { error, token } = await loginService.login(req.body);

  if (error) {
    handleError(error);
  }

  res.status(201).json({ token });
}

module.exports = {
  login,
};
