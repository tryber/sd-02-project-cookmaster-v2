const connection = require('./connection');

const getUserByEmail = async (email) => {
  const db = await connection();
  const user = db.collection('users').findOne({ email });
  return user;
};

const registerNewUser = async (newUserData) => {
  const { email, password, firstName, lastName } = newUserData;
  return connection()
    .then((database) => database
      .getTable('users')
      .insert(['email', 'user_password', 'first_name', 'last_name'])
      .values(email, password, firstName, lastName)
      .execute());
};

const checkPassword = async (email, password) => {
  const passwordChecking = await connection()
    .then((database) =>
      database
        .getTable('users')
        .select(['id'])
        .where('email = :email AND user_password = :password')
        .bind('email', email)
        .bind('password', password)
        .execute())
    .then((results) => results.fetchAll())
    .then((users) => users[0]);

  if (!passwordChecking) return false;
  return true;
};

const updateUser = async (userData) => {
  const { email, password, firstName, lastName, id } = userData;
  useSession()
    .then((session) =>
      session
        .sql(`UPDATE users
              SET
              email = ?,
              user_password = ?,
              first_name = ?,
              last_name = ?
              WHERE id = ?`)
        .bind(email)
        .bind(password)
        .bind(firstName)
        .bind(lastName)
        .bind(id)
        .execute());
};

module.exports = {
  getUserByEmail,
  registerNewUser,
  checkPassword,
  updateUser,
};
