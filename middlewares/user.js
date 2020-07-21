const Boom = require('@hapi/boom');

async function user(req, _res, next) {
  try {
    const isNotAdmin = req.user.role !== 'admin';
    const isOwner = req.recipe ? `${req.recipe.author_id}` !== `${req.user._id}` : true;

    if (isNotAdmin && isOwner) {
      throw Boom.badRequest('Usuário não permitido');
    }

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = user;
