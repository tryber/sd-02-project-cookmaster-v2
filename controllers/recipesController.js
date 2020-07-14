const { getRecipes, getRecipe, validateAndCreateRecipe, verifyRecipePermission,
  deleteRecipe } = require('../services/recipesService');
const { validateIDFormat } = require('../services/utils/schemaValidator');

const getAllRecipes = async (req, res) => {
  const recipes = await getRecipes();
  res.status(200).json({
    recipes,
  });
};

const getRecipeId = async (req, res, next) => {
  try {
    const recipe = await getRecipe(req.params.id);
    if (!recipe[0]) return next({ code: 'not_found', message: 'ID not found' });
    res.status(200).json({
      recipe,
    });
  } catch (err) {
    next({ code: 'something_wrong', message: 'Something went wrong' });
  }
};

const createRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;
  if (!name || !ingredients || !preparation) {
    return next({ code: 'invalid_data', message: 'Missing fields' });
  }
  try {
    const newRecipe = await validateAndCreateRecipe(req.body, _id);
    res.status(201).json({
      createdRecipe: newRecipe[0],
    });
  } catch (error) {
    next({ code: 'something_wrong', message: 'Something went wrong' });
  }
};

const deleteRecipeId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedRecipe = await deleteRecipe(id);
    res.status(201).json({
      deletedRecipe,
    });
  } catch (err) {
    next({ code: 'something_wrong', message: 'Something went wrong' });
  }
};

const verifyIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  if (!validateIDFormat(id).error) return next();
  next({ code: 'invalid_data', message: 'Insert a valid ID' });
};

const verifyPermissions = async (req, res, next) => {
  const { _id, role } = req.user;
  const { id } = req.params;
  const permission = await verifyRecipePermission(_id, id, role);
  if (permission.error) return next({ code: 'not_found', message: 'Recipe not found' });
  if (permission.denied) return next({ code: 'unauthorized', message: 'User unauthorized' });
  next();
};

module.exports = {
  getAllRecipes,
  createRecipe,
  getRecipeId,
  deleteRecipeId,
  verifyIdMiddleware,
  verifyPermissions,
};
