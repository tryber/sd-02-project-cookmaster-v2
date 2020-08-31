const rescue = require('express-rescue');
const registrationModel = require('../models/registrationModel');
const { createAdmin } = require('../createAdmin');
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

const registerAdmin = rescue(async (req, res, next) => {
  if(req.user.role !== 'admin') throw new Error('Necessário credenciais de administrador', 403);
  await userValidation.validateAsync(req.body)
    .then(async () => {
      await createAdmin(req.body).catch((err) => {
        throw new MongoError(err.message, err.status);
      });
      return res.status(201).send({ message: "Usuário administrador criado." });
    })
    .catch((err) => {
      throw new MongoError(err.message, err.status);
    })
});

module.exports = {
  registerUser,
  registerAdmin
};
