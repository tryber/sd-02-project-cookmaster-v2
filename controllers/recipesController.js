const recipesService = require('../services/recipesService');

const Boom = require('@hapi/boom');

async function create(req, res) {
  const { error, recipe } = await recipesService.create({ ...req.body, authorId: req.user.id });

  if (error === 'exist-recipe') {
    throw Boom.badRequest('Receita já cadastrada pelo usuário');
  }

  res.status(201).json({ recipe });
}

async function list(_req, res) {
  const { recipes } = await recipesService.list();

  res.status(200).json({ recipes });
}

async function remove(req, res) {
  await recipesService.remove(req.params.id);

  res.status(200).json({ message: 'Receita removida com sucesso!' });
}

async function update(req, res) {
  const { recipe } = await recipesService.update({
    id: req.params.id,
    body: req.body,
  });

  res.status(200).json({ recipe });
}

async function upadateImage(req, res) {
  try {
    const { recipe } = await recipesService.upadateImage({
      id: req.params.id,
      url: `http://localhost:3000/images/${req.file.filename}`,
    });

    res.status(200).json({ recipe });
  } catch (err) {
    throw err;
  }
}

module.exports = {
  create,
  list,
  remove,
  update,
  upadateImage,
};
