const services = require('../services');

const isRecipeValid = (req, res, next) => {
  const { error } = services.isRecipeValid.validate(req.body);
  if (error) {
    return res.status(422).json({
      message: error.details[0].message,
      code: 'bad_data'
    });
  }
  return next();
};

module.exports = {
  isRecipeValid,
}
