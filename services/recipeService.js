const recipeModels = require('../models/recipeModels');

const createRecipe = (recipe) => recipeModels.createRecipe(recipe);

const getAllRecipes = recipeModels.getAllRecipes;

const findById = (id) => recipeModels.findById(id);

const validateRecipe = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    return { status: 422, error: 'Dados Inválidos', code: 'invalid_data' };
  }

  if (typeof name !== 'string' || typeof ingredients !== 'string' || typeof preparation !== 'string') {
    return { status: 422, error: 'Formato inválido', code: 'invalid_data_format' };
  }

  return true;
};

const updateRecipeById = (id, newRecipe) => recipeModels.updateRecipeById(id, newRecipe);

const validateUpdate = async (id, authorID, role) => {
  const isUpdated = await findById(id);

  if (!isUpdated) {
    return {
      status: 404,
      message: 'Receita não existe',
      code: 'not_found',
    };
  }

  if (isUpdated.error) {
    return {
      status: isUpdated.status,
      message: isUpdated.error,
      code: isUpdated.code,
    };
  }

  if (JSON.stringify(isUpdated.authorID) !== JSON.stringify(authorID) && role === 'user') {
    return {
      status: 401,
      message: 'Usuário não tem permissão para alterar a receita',
      code: 'not_allowed',
    };
  }

  return isUpdated;
};

module.exports = {
  createRecipe,
  validateRecipe,
  getAllRecipes,
  findById,
  updateRecipeById,
  validateUpdate,
};
