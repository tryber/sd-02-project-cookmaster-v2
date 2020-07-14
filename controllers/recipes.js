const rescue = require('express-rescue');

const Checker = require('./Checker');
const Recipe = require('../models/Recipe');

const getAll = rescue(async (_req, res) => {
  const receitas = await Recipe.getAll();
  return res.status(200).send(receitas);
});

const getById = rescue(async (req, res) => {
  const id = req.params.id;

  const recipe = await Recipe.getById(id);

  if (!recipe) return res.status(404).send('Receita não encontrada');

  return res.status(200).send(recipe);
});

const add = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation)
    return res.status(401).send('Nome, ingredientes e modo de preparação devem ser passados');

  const userId = req.user._id;

  const newRecipe = new Recipe(name, ingredients, preparation, userId);
  const response = await newRecipe.add();

  res.status(201).send(response.ops[0]);
});

const edit = rescue(async (req, res) => {
  const id = req.params.id;
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation)
    return res.status(401).send('Nome, ingredientes e modo de preparação devem ser passados');

  const recipe = await Recipe.getById(id);
  if (!recipe)
    return res.status(404).send('Receita não encontrada');

  if (recipe.userId !== req.user._id || req.user.role !== 'admin')
    return res.status(403).send('Você não tem autorização');

  const newRecipe = new Recipe(name, ingredients, preparation, req.user._id);
  const response = await newRecipe.updateById(id);

  res.status(200).send(response);
});

const del = rescue(async (req, res) => {
  const id = req.params.id;
  const recipe = await Recipe.getById(id);

  if (!recipe)
    return res.status(404).send('Receita não encontrada');

  if (recipe.userId !== req.user._id && req.user.role !== 'admin')
    return res.status(403).send('Você não tem autorização');

  const response = await Recipe.deleteById(id);

  res.status(200).send(response);
});

const addImage = rescue(async (req, res) => {
  const id = req.params.id;

  const recipe = await Recipe.getById(id);
  if (!recipe) return res.status(404).send('Receita não encontrada');

  if (recipe.userId !== req.user._id && req.user.role !== 'admin')
    return res.status(403).send('Você não tem autorização');

  const { name, ingredients, preparation, userId } = recipe;

  const newRecipe = new Recipe(name, ingredients, preparation, userId, req.file.filename);
  const response = newRecipe.updateById(id);

  res.status(200).send(response);
});

module.exports = {
  getAll,
  getById,
  add,
  edit,
  del,
  addImage,
};
