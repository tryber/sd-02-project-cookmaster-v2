const connection = require('./connection');

const getAllUsers = async () => {
  const session = await connection();
  const result = await session.sql(
    `SELECT u.id, u.email, u.password, u.name, u.role
    FROM users AS u;`,
  )
    .execute()
    .then((results) => results.fetchAll())
    .then((users) => users.map(
      ([userId, email, password, name, role]) =>
        ({ userId, email, password, name, role }),
    ));
  return result;
};

const getUserByEmail = async (param) => {
  const session = await connection();
  const result = await session.sql(
    `SELECT u.id, u.email, u.password, u.role
    FROM users AS u
    WHERE u.email = ?;`,
  )
    .bind(param)
    .execute()
    .then((results) => results.fetchAll()[0] || []);

  if (!result.length) return null;
  const [id, email, password, role] = result;

  return { id, email, password, role };
};

const createUser = async (name, email, password, role = 'std') => {
  const session = await connection();
  const id = await session.sql(
    `INSERT INTO users (name, email, password, role)
    VALUES (?, ?, ?, ?);`,
  )
    .bind(name)
    .bind(email)
    .bind(password)
    .bind(role)
    .execute()
    .then((result) => result.getAutoIncrementValue());
  return { id, email, name, role };
};

const getUserById = async (param) => {
  const session = await connection();
  const result = await session.sql(
    `SELECT u.id, u.email, u.password, u.role
    FROM users AS u
    WHERE u.id = ?;`,
  )
    .bind(param)
    .execute()
    .then((results) => results.fetchAll()[0] || []);

  if (!result.length) return null;
  const [id, email, password, role] = result;

  return { id, email, password, role };
};

module.exports = {
  getAllUsers,
  getUserByEmail,
  createUser,
  getUserById,
};
