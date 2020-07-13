const connection = require('./connection');

// const getNewUser = (userData) => {
//   const { id, firstName, lastName, email, password } = userData;

//   const fullName = [firstName, lastName].join(' ');

//   return {
//     id,
//     name: fullName,
//     email,
//     password,
//   };
// };

const findByEmail = async (emailParam) => (
  connection()
    .then((session) => session.getSchema('cookmaster'))
    .then((db) => (
      db
        .getTable('users')
        .select(['id', 'name', 'email', 'password', 'role'])
        .where('email = :email')
        .bind('email', emailParam)
        .execute()
    ))
    .then((results) => results.fetchAll())
    .then((users) => (
      users.map(([id, name, email, password, role]) => ({
        id,
        name,
        email,
        password,
        role,
      }))[0]
    ))
);

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (idParam) => {
  return connection()
    .then((session) => session.getSchema('cookmaster'))
    .then((db) => (
      db
        .getTable('users')
        .select(['id', 'first_name', 'last_name', 'email', 'password'])
        .where('id = :id')
        .bind('id', idParam)
        .execute()
    ))
    .then((results) => results.fetchAll())
    .then((users) => (
      users.map(([id, firstName, lastName, email, password]) =>
        getNewUser({ id, firstName, lastName, email, password }),
      )[0]
    ));
};

const create = async (name, email, password) => (
  connection()
    .then((session) => session.getSchema('cookmaster'))
    .then((db) => (
      db
        .getTable('users')
        .insert(['name', 'email', 'password'])
        .values([name, email, password])
        .execute()
    ))
    .then(() => ({
      name,
      email,
      password,
      role: 'user',
    }))
);

module.exports = {
  findByEmail,
  findById,
  create,
};
