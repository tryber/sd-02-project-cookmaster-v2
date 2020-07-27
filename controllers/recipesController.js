const express = require('express');
const rescue = require('express-rescue');
const recipesService = require('../services/recipesService');
const { notFound, badData, exists, unauthorized } = require('../middlewares/error');
const { auth } = require('../middlewares/auth');
const verifyImage = require('../middlewares/verifyImage');
const uploadImage = require('../middlewares/uploadImage');

const router = express.Router();

const checkIntegrity = (name, preparation) => {
  if (typeof name !== 'string' || name.length === 0 || typeof preparation !== 'string' || preparation.length === 0) {
    return false;
  }
  return true;
};

router.post('/', auth, rescue(async (req, res, _next) => {
  const { name, ingredients, preparation } = req.body;
  const { _id, name: userName, email, password } = req.user;
  if (!checkIntegrity(name, preparation)) { throw badData; }
  const newRecipe = await recipesService.createRecipe({ name, ingredients, preparation, _id });
  if (newRecipe === 409) { throw exists; }
  return res.status(201).json(newRecipe);
}));

router.get('/', rescue(async (_req, res) => {
  const listRecipes = await recipesService.listRecipes();
  return res.status(201).json(listRecipes);
}));

router.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const singleRecipe = await recipesService.showOneRecipe(id);
  if (singleRecipe === 404) { throw notFound; }
  return res.status(200).json(singleRecipe);
}));

router.put('/:id', auth, rescue(async (req, res, _next) => {
  const { name, ingredients, preparation } = req.body;
  const { id } = req.params;
  const { _id, name: userName, email, password } = req.user;
  if (!checkIntegrity(name, preparation)) { throw badData; }
  const updateRecipe = await recipesService.updateRecipe({name, ingredients, preparation, _id, id});
  if (updateRecipe === 404) { throw notFound; }
  if (updateRecipe === 401) { throw unauthorized; }
  return res.status(204).json(updateRecipe);
}));

router.delete('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const deleteRecipe = await recipesService.deleteRecipe(id);
  if (deleteRecipe === 404) { throw notFound; }
  return res.status(204).json();
}));

router.put('/:id/image', auth, verifyImage, uploadImage, async (req, res, _next) => {
  const { file: { filename }, params: { id } } = req;
  const updatedRecipe = await recipesService.uploadRecipeImage(id, filename);
  res.status(200).json(updatedRecipe);
});

module.exports = router;
