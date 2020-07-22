// const express = require('express');
const userService = require('../services/userService');

const loginValidation = (req, res) => {
  const { email, password } = req.body;
  // validacao
  const token = userService.loginValidation(email, password);
  // tratar erro
  return res.status(200).json({ token });
};

module.exports = {
  loginValidation,
};
