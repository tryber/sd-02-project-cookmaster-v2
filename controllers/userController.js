const userService = require('../services/userService');

const Boom = require('@hapi/boom');

function handleError(error) {
  const { type, details } = error;

  if (type === 'invalid-data') {
    throw Boom.badRequest('Dados inválidos', details);
  }

  if (type === 'exist-user') {
    throw Boom.badRequest('Email já cadastrado');
  }
}

async function register(req, res) {
  try {
    const { error } = await userService.register(req.body);

    handleError(error);

    res.status(201).json({ message: 'Usuário criado com sucesso!' });
  } catch (err) {
    throw err;
  }
}

async function registerAdmin(req, res) {
  try {
    const { error } = await userService.register(req.body);

    handleError(error);

    res.status(201).json({ message: 'Usuário criado com sucesso!' });
  } catch (err) {
    throw err;
  }
}

module.exports = {
  register,
  registerAdmin,
};
