const { recipe } = require('../services');

const recipeDetails = async (req, res, next) => {
  const { results, error } = await recipe.findOne(req.params.id);
  if (error) return next(error);
  res.status(200).json(results)
};

module.exports = recipeDetails;
