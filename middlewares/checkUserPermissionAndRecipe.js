const recipeModel = require('../models/recipeModel');
const userModel = require('../models/userModel');

async function checkUserPermissionAndRecipe(req, res, next) {
  const { id: recipeId } = req.params;
  const { _id: userId } = req.user;

  const [recipe, user] = await Promise.all([
    recipeModel.getRecipeById(recipeId),
    userModel.getUserById(userId),
  ]);

  if (!recipe) return res.status(404).json({ message: 'recipe not found' });

  if (recipe.userId.toString() !== userId.toString() && user.role !== 'admin') {
    return res
      .status(403)
      .json({ message: 'You don\'t have permission to perform this action. Edit your own recipes ou log in as admin' });
  }
  return next();
}

module.exports = { checkUserPermissionAndRecipe };
