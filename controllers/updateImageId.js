const { recipe } = require('../services');

const updateImageId = async (req, res, next) => {
  if (!req.file) return next({ message: 'You need provide img to edit', code: 'invalid_data' });
  const { error } = await recipe.insertImageId(req.file, req.params.id);
  if (error) return next(error);
  return res.status(200).json(true);
};

module.exports = updateImageId;
