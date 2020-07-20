const { recipesSchema } = require('./joinSchemas');

const recipesModel = require('../models/recipesModel');

async function create(body) {
  try {
    const { error, value } = recipesSchema.validate(body, {
      abortEarly: false,
    });

    if (error) {
      return {
        error: { type: 'invalid-data', details: error.details.map(({ message }) => message) },
        recipe: null,
      };
    }

    const recipe = await recipesModel.create(value);

    return { error: { type: null, details: null }, recipe };
  } catch (err) {
    throw err;
  }
}

async function find(id) {
  try {
    const recipe = await recipesModel.find(id);

    if (!recipe) {
      return {
        error: { type: 'recipe-not-found' },
        recipe: null,
      };
    }

    return { error: { type: null }, recipe };
  } catch (err) {
    throw err;
  }
}

async function list() {
  try {
    const recipes = await recipesModel.list(id);

    return { recipes };
  } catch (err) {
    throw err;
  }
}

async function remove(id) {
  try {
    const recipe = await recipesModel.find(id);

    if (recipe) {
      await recipesModel.remove(id);
    }
  } catch (err) {
    throw err;
  }
}

async function update(id) {
  try {
    const recipe = await recipesModel.find(id);

    if (!recipe) {
      return {
        error: { type: 'recipe-not-found' },
        recipe: null,
      };
    }

    const newRecipe = await recipesModel.update(id);

    return { error: { type: null }, recipe: newRecipe };
  } catch (err) {
    throw err;
  }
}

async function upadateImage(id) {
  try {
    const recipe = await recipesModel.find(id);

    if (!recipe) {
      return {
        error: { type: 'recipe-not-found' },
        recipe: null,
      };
    }

    const newRecipe = await recipesModel.upadateImage(id);

    return { error: { type: null }, recipe: newRecipe };
  } catch (err) {
    throw err;
  }
}

module.exports = {
  create,
  find,
  list,
  remove,
  update,
  upadateImage,
};
