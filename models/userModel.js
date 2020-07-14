const connection = require('./connection');

const getUserByEmail = async (email) => {
  const db = await connection();
  const user = db.collection('users').findOne({ email });
  return user;
};

const registerNewUser = async ({ name, email, password }) => {
  const db = await connection();
  const newUser = db.collection('users').insertOne({ name, email, password, role: 'user' });
  return (await newUser).ops[0];
};

module.exports = {
  getUserByEmail,
  registerNewUser,
};
