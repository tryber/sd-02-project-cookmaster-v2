const rescue = require('express-rescue');
const registrationModel = require('../models/registrationModel');
const { MongoError } = require('../services/errorObjects');
const { userValidation } = require('../services/inputValidation');

const registerUser = rescue(async (req, res, next) =>
  userValidation.validateAsync(req.body)
    .then(async () => {
      const { user, message } = await registrationModel.registerNewUser(req.body);
      res.status(201).send({ user, message });
      next();
    })
    .catch((err) => {
      throw new MongoError(err.message, err.status);
    })
);

module.exports = {
  registerUser,
};
