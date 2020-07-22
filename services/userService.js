const jwt = require('jsonwebtoken');
const userModels = require('../models/userModels');

const createUser = (user) => userModels.createUser(user);

const validateLogin = (login) => {
  const jwtConfig = {
    expiresIn: '2h',
    algorithm: 'HS256'
  };
  // Enviar pro banco e comprar email e password
  const token = jwt.sign({ data: userInfo }, process.env.JWT_SECRET, jwtConfig);
  return token;
}

module.exports = {
  createUser,
};
