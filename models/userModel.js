const connection = require('./connection');
const { ObjectId } = require('mongodb');

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */

const anyUserFound = (userData) => {
  if (userData) {
    const { _id: id, email, password, name, role } = userData;
    const userObject = { id, email, password, name, role };
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
const findById = async (userId) => {
  const registeredUser = await connection().then((db) =>
  db
    .collection('users').findOne(ObjectId(userId)));

return anyUserFound(registeredUser);
};

module.exports = {
  findByEmail,
  findById,
};
