const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const tokenValidation = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(400).json({
      message: 'Token não encontrado ou não informado',
      code: 'token_not_found'
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userService.findById(payload.data.id);

    if (!user) {
      res.status(401).json({
        message: 'Erro ao procurar usuario do token.',
        code: 'token_error'
      });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Erro: Seu token é inválido',
      code: 'invalid_token'
    });
  }
};

module.exports = {
  tokenValidation,
};
