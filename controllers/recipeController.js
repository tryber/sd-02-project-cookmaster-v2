const recipeService = require('../services/recipeService');

const listRecipes = async (_req, res) => {
  const recipes = await recipeService.getAllRecipes();

  if (!recipes) return res.status(500).json({ message: 'Error when connecting to database' });

  return res.status(200).json(recipes);
};

const showRecipe = async (req, res) => {
  const { id } = req.params;

  const recipe = await recipeService.showRecipe(id);

  if (!recipe) return res.status(500).json({ message: 'Error when connecting to database' });

  if (recipe.error) return res.status(recipe.code).json({ message: recipe.message });

  return res.status(200).json(recipe);
};

function validateNewRecipe({ name, ingredients, preparation }) {
  const validName = name && typeof name === 'string';
  const validIngredients = ingredients && typeof ingredients === 'string';
  const validPreparation = preparation && typeof preparation === 'string';
  if (!validName || !validIngredients || !validPreparation) return false;
  return true;
}

const newRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;

  const validEntries = validateNewRecipe({ name, ingredients, preparation });

  if (!validEntries) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  const recipe = await recipeService.registerNewRecipe({ name, ingredients, preparation, userId });

  if (!recipe) return res.status(500).json({ message: 'Error when creating new recipe' });

  if (recipe.error) return res.status(recipe.code).json({ message: recipe.message });

  return res.status(201).json({ recipe });
};

const editRecipe = async (req, res) => { };

const deleteRecipe = async (req, res) => { };

module.exports = {
  listRecipes,
  showRecipe,
  newRecipe,
  editRecipe,
  deleteRecipe,
};
