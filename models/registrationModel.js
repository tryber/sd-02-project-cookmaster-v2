const rescue = require('express-rescue');
const connection = require('./connection');
const userModel = require('./userModel');
const { UserAlreadyExists } = require('../services/errorObjects');

const registerNewUser = async (userData = null) => {
  const { email, name, password } = userData;
  const doesUserExists = await userModel.findByEmail(email);
  if (doesUserExists) throw new UserAlreadyExists;

  const user = await connection().then((db) =>
    db.collection('users').insertOne({ email, name, password, role: 'user' }))

  return { user: user.ops[0], message: 'Usuário cadastrado com sucesso.' };
};

module.exports = {
  registerNewUser,
};
