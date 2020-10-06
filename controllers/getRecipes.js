const { recipe } = require('../services');

const receiveRecipes = async (_req, res, next) => {
  const response = await recipe.findAll();
  if (response.error) return next(response.error);
  res.status(200).json({ data: response });
};

module.exports = receiveRecipes;
