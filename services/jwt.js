require('dotenv').config();
const JWT = require('jsonwebtoken');

const generateToken = (data) => {
  const secret = process.env.SECRET;
  const configJWT = {
    expiresIn: '300m',
    algorithm: 'HS256',
  };

  return JWT.sign(data, secret, configJWT);
};

module.exports = {
  generateToken,
};


