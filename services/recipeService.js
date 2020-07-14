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

module.exports = {
  createNew,
};
