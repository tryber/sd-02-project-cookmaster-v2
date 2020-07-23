const Boom = require('@hapi/boom');

const jwt = require('jsonwebtoken');

const userModel = require('../models/userModel');

async function auth(req, _res, next) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw Boom.badRequest('Token não encontrado ou informado');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.find({ email: decoded.data.email });

    if (!user) {
      throw Boom.unauthorized('Erro ao procurar usuario referente ao token.');
    }

    const { _id: id, ...userWithoutId } = user;

    req.user = { id, ...userWithoutId };

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = auth;
