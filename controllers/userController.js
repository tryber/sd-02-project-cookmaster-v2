const userService = require('../services/userService');

const Boom = require('@hapi/boom');

function handleError(error) {
  if (error === 'exist-user') {
    throw Boom.badRequest('Email já cadastrado');
  }
}

async function register(req, res) {
  const { error } = await userService.register(req.body);

  if (error) {
    handleError(error);
  }

  res.status(201).json({ message: 'Usuário criado com sucesso!' });
}

async function registerAdmin(req, res) {
  const { error } = await userService.register({ ...req.body, role: 'admin' });

  if (error) {
    handleError(error);
  }

  res.status(201).json({ message: 'Usuário criado com sucesso!' });
}

module.exports = {
  register,
  registerAdmin,
};
