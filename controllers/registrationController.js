const registrationModel = require('../models/registrationModel');
const editUserModel = require('../models/admin/editUserModel');
const userModel = require('../models/userModel');

const displayRegistration = async (_req, res) => res.render('register', { message: '', redirect: false });

const registerUser = async (req, res) => {
  const { user, message, error } = await registrationModel.registerNewUser(req.body);
  if (error) return res.status(400).send({ message });
  return res.status(201).send({ user, message });
};

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
