// const express = require('express');
const userService = require('../services/userService');

const loginValidation = async (req, res) => {
  const { email, password } = req.body;

  const isValid = await userService.validateUser(email, password);

  if (isValid.error) {
    return res.status(isValid.status).json({ message: isValid.error, code: isValid.code })
  }
  return res.status(200).json({ token: isValid.token });
};

module.exports = {
  loginValidation,
};
