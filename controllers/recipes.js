const rescue = require('express-rescue');

const Recipe = require('../models/Recipe');

const getAll = rescue(async (_req, res) => {
  const receitas = await Recipe.getAll();
  return res.status(200).json(receitas);
});

const getById = rescue(async (req, res) => {
  const id = req.params.id;

  const recipe = await Recipe.getById(id);

  if (!recipe) { return res.status(404).send('Receita não encontrada'); }

  return res.status(200).json(recipe);
});

const add = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) {
    return res.status(401).send('Nome, ingredientes e modo de preparação devem ser passados');
  }

  const userId = req.user.id;

  const newRecipe = new Recipe(name, ingredients, preparation, userId);
  const response = await newRecipe.add();

  res.status(201).json(response.ops[0]);
});

const edit = rescue(async (req, res) => {
  const recipeId = req.params.id;
  const { id } = req.user;
  const { name, ingredients, preparation } = req.body;
  
  if (!name || !ingredients || !preparation) {
    return res.status(401).send('Nome, ingredientes e modo de preparação devem ser passados');
  }
  
  const recipe = await Recipe.getById(recipeId);
  if (!recipe) {
    return res.status(404).send('Receita não encontrada');
  }
  const { userId } = recipe;

  console.log(typeof id);
  console.log(typeof userId)
  console.log(recipe.userId !== req.user.id)

  if (!(toString(recipe.userId) === toString(req.user.id) || req.user.role === 'admin')) {
    return res.status(403).send('Você não tem autorização');
  }

  const newRecipe = new Recipe(name, ingredients, preparation, recipe.userId);
  const response = await newRecipe.updateById(recipeId);

  res.status(200).json(response);
});

const del = rescue(async (req, res) => {
  const id = req.params.id;
  const recipe = await Recipe.getById(id);

  if (!recipe) {
    return res.status(404).send('Receita não encontrada');
  }

  if (!(toString(recipe.userId) === toString(req.user.id) || req.user.role === 'admin')) {
    return res.status(403).send('Você não tem autorização');
  }

  const response = await Recipe.deleteById(id);

  res.status(200).json(response);
});

const addImage = rescue(async (req, res) => {
  const id = req.params.id;

  const recipe = await Recipe.getById(id);
  if (!recipe) { return res.status(404).send('Receita não encontrada'); }

  if (!(toString(recipe.userId) === toString(req.user.id) || req.user.role === 'admin')) {
    return res.status(403).send('Você não tem autorização');
  }

  const { name, ingredients, preparation, userId } = recipe;

  const newRecipe = new Recipe(name, ingredients, preparation, userId, req.file.filename);
  const response = newRecipe.updateById(id);

  res.status(200).json(response);
});

module.exports = {
  getAll,
  getById,
  add,
  edit,
  del,
  addImage,
};
