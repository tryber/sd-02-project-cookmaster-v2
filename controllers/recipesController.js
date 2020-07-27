const express = require('express');
const rescue = require('express-rescue');
const recipesService = require('../services/recipesService');
const { notFound, badData, exists, unauthorized } = require('../middlewares/error');
const { auth } = require('../middlewares/auth');

const router = express.Router();

const checkIntegrity = (name, ingredients, preparation) => {
  if (typeof name !== 'string' || name.length === 0 || typeof preparation !== 'string' || preparation.length === 0) {
    return false;
  }
  return true;
};

router.post('/', auth, rescue(async (req, res, _next) => {
  const { name, ingredients, preparation } = req.body;
  const { _id, name: userName, email, password } = req.user;
  if (!checkIntegrity(name, ingredients, preparation)) { throw badData; }
  const newRecipe = await recipesService.createRecipe({ name, ingredients, preparation, _id });
  if (newRecipe === 409) { throw exists; }
  return res.status(201).json(newRecipe);
}));


module.exports = router;
