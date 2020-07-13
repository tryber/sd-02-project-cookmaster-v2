const express = require('express');
const boom = require('boom');
const services = require('../services');

//const { v4: uuid } = require('uuid');
//const { SESSIONS } = require('../middlewares/auth');
//const userModel = require('../models/userModel');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { name, email, password } = req.body;

  const fields = ['name', 'email', 'password'];
  const data = [name, email, password];

  const invalidData = data.find((fieldData) => typeof fieldData !== 'string');

  if (invalidData || data.some((fieldData) => fieldData === undefined)) {
    const invalidField = fields[data.indexOf(invalidData)];
    return next(boom.badData('Dados inválidos', invalidField));
  }

  const {
    success,
    conflict,
    message,
    newUser,
  } = await services.user.register(name, email, password);

  if (conflict) return next(boom.conflict(message));

  if (!success) return next({ message });

  return res.status(201).json({ message, newUser });
});

// const loginForm = (req, res) => {
//   const { token = '' } = req.cookies || {};

//   if (SESSIONS[token]) return res.redirect('/');

//   return res.render('admin/login', {
//     message: null,
//     redirect: req.query.redirect,
//   });
// };

// const registerForm = (req, res) => (
//   res.render(
//     'admin/register',
//     { message: null, redirect: req.query.redirect },
//   )
// );

// const login = async (req, res, next) => {
//   const { email, password, redirect } = req.body;

//   if (!email || !password)
//     return res.render('admin/login', {
//       message: 'Preencha o email e a senha',
//       redirect: null,
//     });

//   const user = await userModel.findByEmail(email);

//   if (!user || user.password !== password)
//     return res.render('admin/login', {
//       message: 'Email ou senha incorretos',
//       redirect: null,
//     });

//   const token = uuid();
//   SESSIONS[token] = user.id;

//   res.cookie('token', token, { httpOnly: true, sameSite: true });
//   res.redirect(redirect || '/admin');
// };

// const register = async (req, res, next) => {
//   const { email, password, firstName, lastName } = req.body;

//   if (!email || !password || !firstName || !lastName)
//     return res.render('admin/register', {
//       message: 'Preencha todos os campos',
//       redirect: null,
//     });

//   const user = await userModel.findByEmail(email);

//   if (user)
//     return res.render('admin/register', {
//       message: 'Email já está cadastrado, insira outro',
//     });

//   try {
//     await userModel.registerNewUser({ email, password, firstName, lastName });

//     res.render('admin/register', {
//       message: 'Novo cadastro realizado com sucesso!',
//     });
//   } catch (e) {
//     console.error(e);
//     res.render('admin/register', {
//       message: 'Ocorreu um erro, tente outra vez',
//     });
//   }
// };

// const logout = (req, res) => {
//   res.clearCookie('token');
//   if (!req.cookies || !req.cookies.token) return res.redirect('/login');
//   res.render('admin/logout');
// };

module.exports = router;
