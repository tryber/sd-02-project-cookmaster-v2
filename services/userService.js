const jwt = require('jsonwebtoken');
const userModels = require('../models/userModels');

const createUser = (user) => userModels.createUser(user);

const findByEmail = (email) => userModels.findByEmail(email);

const findById = (id) => userModels.findById(id);

const validateUser = async (email, password) => {
  const jwtConfig = {
    expiresIn: '2h',
    algorithm: 'HS256',
  };
  const user = await userModels.findByEmail(email);

  if (user === false) {
    return { status: 500, error: 'Erro interno', code: 'db_connection_error' };
  }

  if (!user || user.password !== password || user.email !== email) {
    return { status: 422, error: 'Usuário ou senha inválidos', code: 'invalid_data' };
  }

  const userInfo = { id: user._id, name: user.name, role: user.role };
  const token = jwt.sign({ data: userInfo }, process.env.JWT_SECRET, jwtConfig);
  return { token };
};

const validateLogin = async (name, email, password) => {
  if (!name || !email || !password) {
    return { status: 422, error: 'Dados Inválidos.', code: 'invalid_data' };
  }
  const existUser = await userModels.findByEmail(email);

  if (existUser) {
    return { status: 409, error: 'Usuário duplicado.', code: 'duplicated_user' };
  }

  if (existUser === false) {
    return { status: 500, error: 'Erro interno.', code: 'db_connection_error' };
  }

  return true;
};

module.exports = {
  createUser,
  findByEmail,
  validateLogin,
  validateUser,
  findById,
};
