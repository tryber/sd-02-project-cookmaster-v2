const { recipe } = require('../services');

const recipeDelete = async (req, res, next) => {
  const { error } = await recipe.deleteRecipe(req.params.id, req.user);
  if (error) return next(error);
  res.status(200).json(true);
};

module.exports = recipeDelete;
