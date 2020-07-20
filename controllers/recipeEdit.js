const { recipe } = require('../services');

const recipeEdit = async (req, res, next) => {
  const { error } = await recipe.editRecipe(req.params.id, req.user, req.body);
  if (error) return next(error);
  return res.status(200).json(true);
};
module.exports = recipeEdit;