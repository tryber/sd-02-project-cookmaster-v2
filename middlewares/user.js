const Boom = require('@hapi/boom');

async function user(req, _res, next) {
  try {
    const { _id: id } = req.user;

    const isNotAdmin = req.user.role !== 'admin';

    const isOwner = req.recipe ? `${req.recipe.author_id}` !== `${id}` : true;

    if (isNotAdmin && isOwner) {
      throw Boom.badRequest('Usuário não permitido');
    }

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = user;
