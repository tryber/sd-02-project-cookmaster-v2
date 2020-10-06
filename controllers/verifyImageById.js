const { recipe } = require('../services');

const verifyImageById = (req, _res, next) => {
  const { error } = recipe.validInsertImage(req.params.id, req.user);
  if (error) return next(error);
  return next();
};

module.exports = verifyImageById;
