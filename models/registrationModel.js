const connection = require('./connection');
const userModel = require('./userModel');

const registerNewUser = async (userData = null) => {
  if (!userData) return { message: 'Valores inválidos', error: true };
  const [{ email, name, lastName, password, role }] = userData;
  const doesUserExists = await userModel.findByEmail(email);
  if (doesUserExists) return { message: 'E-mail já cadastrado', error: true };

  const user = await connection().then((db) =>
    db.collection('users').insertOne({ email, name, lastName, password, role }))
  .catch((err) => {
    throw err;
  });

  return { user: user.ops[0], message: 'Usuário cadastrado com sucesso.', error: false };
};

module.exports = {
  registerNewUser,
};
