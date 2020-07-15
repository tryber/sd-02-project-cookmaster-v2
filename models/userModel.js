const { ObjectId } = require('mongodb');
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

const getUserById = (id) =>
  connection()
    .then((db) => db.collection('users').findOne({ _id: ObjectId(id) }))
    .then((user) => user)
    .catch((e) => e);

module.exports = {
  getUserByEmail,
  registerNewUser,
  getUserById,
};
