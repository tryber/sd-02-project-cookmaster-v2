const recipeService = require('../services/recipeService');

const listRecipes = async (_req, res) => {
  const recipes = await recipeService.getAllRecipes();

  if (!recipes) return res.status(500).json({ message: 'Error when connecting to database' });

  return res.status(200).json(recipes);
};

const showRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await recipeService.showRecipe(id);
    if (recipe.error) return res.status(recipe.code).json({ message: recipe.message });
    return res.status(200).json(recipe);
  } catch (error) {
    return res.status(500).json({ message: 'Error when connecting to database' });
  }
};

function validateRecipeFields({ name, ingredients, preparation }) {
  const validName = name && typeof name === 'string';
  const validIngredients = ingredients && typeof ingredients === 'string';
  const validPreparation = preparation && typeof preparation === 'string';
  if (!validName || !validIngredients || !validPreparation) return false;
  return true;
}

const newRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;

  const validEntries = validateRecipeFields({ name, ingredients, preparation });

  if (!validEntries) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  try {
    const recipe = await recipeService
      .registerNewRecipe({ name, ingredients, preparation, userId });

    if (recipe.error) return res.status(recipe.code).json({ message: recipe.message });

    return res.status(201).json({ recipe });
  } catch (error) {
    return res.status(500).json({ message: 'Error when connecting to database' });
  }
};

const editRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { id: recipeId } = req.params;
  const { _id: userId } = req.user;

  const validEntries = validateRecipeFields({ name, ingredients, preparation });

  if (!validEntries) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  try {
    const editedRecipe = await recipeService
      .editRecipe({ name, ingredients, preparation, recipeId, userId });

    if (editedRecipe.error) {
      return res.status(editedRecipe.code).json({ message: editedRecipe.message });
    }

    return res.status(200).json(editedRecipe);
  } catch (error) {
    return res.status(500).json({ message: 'Error when connecting to database' });
  }
};

const deleteRecipe = async () => {};

module.exports = {
  listRecipes,
  showRecipe,
  newRecipe,
  editRecipe,
  deleteRecipe,
};
