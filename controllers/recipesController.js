const recipesService = require('../services/recipesService');

const Boom = require('@hapi/boom');

function handleErrorCreate(error) {
  const { type, details } = error;

  if (type === 'invalid-data') {
    throw Boom.badRequest('Dados inválidos', details);
  }

  if (type === 'exist-recipe') {
    throw Boom.badRequest('Receita já cadastrada pelo usuário');
  }
}

async function create(req, res) {
  try {
    const { error, recipe } = await recipesService.create({ ...req.body, authorId: req.user._id });

    handleErrorCreate(error);

    res.status(201).json({ recipe });
  } catch (err) {
    throw err;
  }
}

function handleErrorFind(error) {
  const { type } = error;

  if (type === 'recipe-not-found') {
    throw Boom.badRequest('Receita não encontrada');
  }
}

async function find(req, res) {
  try {
    const { error, recipe } = await recipesService.find(req.params.id);

    handleErrorFind(error);

    res.status(200).json({ recipe });
  } catch (err) {
    throw err;
  }
}

async function list(_req, res) {
  try {
    const { recipes } = await recipesService.list();

    res.status(200).json({ recipes });
  } catch (err) {
    throw err;
  }
}

async function remove(req, res) {
  try {
    await recipesService.remove(req.params.id);

    res.status(200).json({ message: 'Receita removida com sucesso!' });
  } catch (err) {
    throw err;
  }
}

async function update(req, res) {
  try {
    const { recipe } = await recipesService.update(req.params.id);

    handleErrorFind(error);

    res.status(200).json({ recipe });
  } catch (err) {
    throw err;
  }
}

async function upadateImage(req, res) {
  try {
    const { recipe } = await recipesService.upadateImage(req.params.id);

    handleErrorFind(error);

    res.status(200).json({ recipe });
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
