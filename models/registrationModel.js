const connection = require('./connection');
const userModel = require('./userModel');
const bcrypt = require('bcrypt');
const { UserAlreadyExists, FailedToSave } = require('../services/errorObjects');

const registerNewUser = async (userData = null) => {
  const saltRounds = process.env.SALT_ROUNDS;
  const { email, name, password } = userData;
  const doesUserExists = await userModel.findByEmail(email);
  if (doesUserExists) throw new UserAlreadyExists;

  bcrypt.genSalt(Number(saltRounds), (err, salt) =>
    bcrypt.hash(password, salt, (err, hash) =>
      connection()
        .then((db) => db.collection('users')
          .insertOne({ email, name, password: hash, role: 'user' }))
        .catch((err) => {
          throw new FailedToSave;
        })));

  let registeredUser;

  while(!registeredUser) {
    registeredUser = await userModel.findByEmail(email);
  }

  return { message: 'Usuário adicionado com sucesso.', user: registeredUser };
}


module.exports = {
  registerNewUser,
};
