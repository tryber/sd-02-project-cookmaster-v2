const recipesModel = require('../models/recipesModel');

async function create(body) {
  const recipe = await recipesModel.find({
    key: 'name-authorId',
    value: { name: body.name, authorId: body.authorId },
  });

  if (recipe) {
    return {
      error: 'exist-recipe',
      recipe: null,
    };
  }

  const newRecipe = await recipesModel.create(body);

  return { error: null, recipe: newRecipe.ops[0] };
}

async function list() {
  const recipes = await recipesModel.list();

  return { recipes };
}

async function remove(id) {
  await recipesModel.remove(id);
}

async function update({ id, body }) {
  await recipesModel.update({ id, recipe: body });

  const recipe = await recipesModel.find({ key: 'id', value: id });

  return { recipe };
}

async function upadateImage({ id, url }) {
  await recipesModel.upadateImage({ id, url });

  const recipe = await recipesModel.find({ key: 'id', value: id });

  return { recipe };
}

module.exports = {
  create,
  list,
  remove,
  update,
  upadateImage,
};
