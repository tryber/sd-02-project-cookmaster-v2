const connection = require('./connection');

/* Quando você implementar a conexão com o banco, não deve mais precisar desse objeto */
// const TEMP_USER = {
//   id: 1,
//   email: 'taylor.doe@company.com',
//   password: 'password',
//   name: 'Taylor',
//   lastName: 'Doe',
// };

/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */

const anyUserFound = (userData) => {
  if (userData) {
    const { id, email, password, name, lastName, role } = userData;
    const userObject = { id, email, password, name, lastName, role };
    return userObject;
  }

  return null;
};

const findByEmail = async (userEmail) => {
  const registeredUser = await connection().then((db) =>
    db
      .collection('users').findOne({ email: userEmail}));

  return anyUserFound(registeredUser);
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (userID) => {
  const registeredUser = await connection().then((db) =>
  db
    .collection('users').findOne({ _id: userID}));

return anyUserFound(registeredUser);
};

module.exports = {
  findByEmail,
  findById,
};
