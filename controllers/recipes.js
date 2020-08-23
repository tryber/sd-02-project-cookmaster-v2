const rescue = require('express-rescue');

const Recipe = require('../models/Recipe');

const chechAuth = (recipe, user) =>
  !(recipe.userId.equals(user.id) || user.role === 'admin');

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

  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(401).send('Nome, ingredientes e modo de preparação devem ser passados');
  }

  const recipe = await Recipe.getById(recipeId);
  if (!recipe) {
    return res.status(404).send('Receita não encontrada');
  }

  if (chechAuth(recipe, req.user)) {
    return res.status(403).send('Você não tem autorização');
  }

  const newRecipe = new Recipe(name, ingredients, preparation, recipe.userId);
  await newRecipe.updateById(recipeId);

  res.status(200).json({ mensagem: 'Atualizado com sucesso' });
});

const del = rescue(async (req, res) => {
  const id = req.params.id;
  const recipe = await Recipe.getById(id);

  if (!recipe) {
    return res.status(404).send('Receita não encontrada');
  }

  if (chechAuth(recipe, req.user)) {
    return res.status(403).send('Você não tem autorização');
  }

  await Recipe.deleteById(id);

  res.status(200).json({ mensagem: 'deletado com sucesso' });
});

const addImage = rescue(async (req, res) => {
  const id = req.params.id;

  const recipe = await Recipe.getById(id);
  if (!recipe) { return res.status(404).send('Receita não encontrada'); }

  if (chechAuth(recipe, req.user)) {
    return res.status(403).send('Você não tem autorização');
  }

  const { name, ingredients, preparation, userId } = recipe;
  const fullPath = `http://localhost:${process.env.PORT}/images/${req.file.filename}`;
  const newRecipe = new Recipe(name, ingredients, preparation, userId, fullPath);
  newRecipe.updateById(id);

  res.status(200).json(req.file);
});

module.exports = {
  getAll,
  getById,
  add,
  edit,
  del,
  addImage,
};
