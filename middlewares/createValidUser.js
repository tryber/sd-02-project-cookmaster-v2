const services = require('../services');

const isUserValid = (req, res, next) => {
  const { error } = services.isUserValid.validate(req.body);
  if (error) {
    return res.status(422).json({
      message: error.details[0].message,
      code: 'bad_data'
    });
  }
  return next();
};

const isLoginValid = (req, res, next) => {
  const { error } = services.isLoginValid.validate(req.body);
  if (error) {
    return res.status(422).json({
      message: error.details[0].message,
      code: 'bad_data'
    });
  }
  return next();
};

module.exports = {
  isUserValid,
  isLoginValid,
};
