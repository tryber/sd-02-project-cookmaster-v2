const Boom = require('@hapi/boom');

async function user(req, _res, next) {
  try {
    if (req.user.role !== 'admin' && `${req.recipe.author_id}` !== `${req.user._id}`) {
      throw Boom.badRequest('Usuário não permitido');
    }

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = user;
