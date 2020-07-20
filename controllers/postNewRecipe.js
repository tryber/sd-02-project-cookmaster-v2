const { recipe } = require('../services');

const postNewRecipe = async (req, res, next) => {
  const { _id: id } = req.user;
  const { error } = await recipe.newRecipe(id, req.body);
  if (error) return next(error);
  return res.status(201).json(true);
};

module.exports = postNewRecipe;
