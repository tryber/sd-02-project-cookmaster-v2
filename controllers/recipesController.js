const { getRecipes, validateAndCreateRecipe } = require('../services/recipesService');

const getAllRecipes = async (req, res) => {
  const recipes = await getRecipes();
  res.status(200).json({
    recipes,
  });
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

module.exports = {
  getAllRecipes,
  createRecipe,
};
