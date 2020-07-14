const models = require('../models');

const createNew = async (name, ingredients, preparation, authorId) => {
  try {
    const newRecipe = await models.recipe.create(name, ingredients, preparation, authorId);
    return {
      success: true,
      message: 'Receita criada com sucesso!',
      newRecipe,
    };
  } catch (err) {
    return { message: err.message };
  }
};

const showAll = async () => {
  try {
    const recipes = await models.recipe.getAll();
    return {
      success: true,
      message: 'Receitas mostradas com sucesso!',
      recipes,
    };
  } catch (err) {
    return { message: err.message };
  }
};

const showOne = async (id) => {
  try {
    const recipe = await models.recipe.getById(id);

    if (!recipe) {
      return {
        notFound: true,
        message: 'Receita não encontrada',
      };
    }

    return {
      success: true,
      message: 'Receita mostrada com sucesso!',
      recipe,
    };
  } catch (err) {
    return { message: err.message };
  }
};

module.exports = {
  createNew,
  showAll,
  showOne,
};
