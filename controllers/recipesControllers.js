const rescue = require('express-rescue');
const validJoi = require('../middlewares/validateJoi');
const { schemaNewRecipe } = require('../middlewares/schemasJoi');
// const recipesServices = require('../services/recipesServices');

const newRecipe = rescue(async (req, res) => {
  const { ...recipe } = req.body;
  await validJoi.validateJoi(schemaNewRecipe, recipe);
  res.json({ message: 'ok' });
});

module.exports = {
  newRecipe,
};
