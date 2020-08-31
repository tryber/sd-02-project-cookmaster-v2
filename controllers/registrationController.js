const rescue = require('express-rescue');
const registrationModel = require('../models/registrationModel');
const editUserModel = require('../models/admin/editUserModel');
const userModel = require('../models/userModel');
const { MongoError } = require('../services/errorObjects');
const { userValidation } = require('../services/validation');

const displayRegistration = async (_req, res) => res.render('register', { message: '', redirect: false });

const registerUser = rescue(async (req, res) => userValidation.validateAsync(req.body)
  .then(async () => {
    const { user, message } = await registrationModel.registerNewUser(req.body);
    return res.status(201).send({ user, message });
  })
  .catch((err) => {
    throw new MongoError(err.message, err.status);
  })
);

const editUserPage = async (req, res) => {
  const { user: { id } } = req;
  const userData = await userModel.findById(id);
  res.render('admin/editUser', { message: '', ...userData });
};

const editUser = async (req, res) => {
  const { message } = await editUserModel.editUser(req.body, req.user.id);
  const { user: { id } } = req;
  const userData = await userModel.findById(id);
  return res.render('admin/editUser', { message, ...userData });
};

module.exports = {
  displayRegistration,
  registerUser,
  editUserPage,
  editUser,
};
