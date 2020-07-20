const loginService = require('../services/loginService');

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
}

async function login(req, res) {
  try {
    const { error, token } = await loginService.login(req.body);

    handleError(error);

    res.status(201).json({ token });
  } catch (err) {
    throw err;
  }
}

module.exports = {
  login,
};
