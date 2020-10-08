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

  const validEntries = validateRecipeFields({ name, ingredients, preparation });

  if (!validEntries) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  try {
    const editedRecipe = await recipeService
      .editRecipe({ name, ingredients, preparation, recipeId });

    return res.status(200).json(editedRecipe);
  } catch (error) {
    return res.status(500).json({ message: 'Error when connecting to database' });
  }
};

const deleteRecipe = async (req, res) =>
  recipeService.deleteRecipe(req.params.id)
    .then((result) => res.status(204).json({ deletedRecipe: result }))
    .catch(() => res.status(500).json({ message: 'Error when connecting to database' }));

const insertRecipeImage = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Please, select an image' });

  const { id } = req.params;
  const { filename } = req.file;

  return recipeService.insertRecipeImage({ id, filename })
    .then((result) => res.status(200).json(result))
    .catch(() => res.status(500).json({ message: 'Error when connecting to database' }));
};

module.exports = {
  listRecipes,
  showRecipe,
  newRecipe,
  editRecipe,
  deleteRecipe,
  insertRecipeImage,
};
