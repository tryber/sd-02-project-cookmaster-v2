const { recipe } = require('../services');

const postNewRecipe = async (req, res, next) => {
  const { id } = req.user;
  const { error, creatorId: _creatorId, ...results } = await recipe.newRecipe(id, req.body);
  if (error) return next(error);
  return res.status(201).json({ ...results });
};

module.exports = postNewRecipe;
