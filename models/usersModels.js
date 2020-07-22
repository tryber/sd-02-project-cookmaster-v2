const connection = require('./connection');

const newUser = async (user) => {
  const db = await connection();
  const newUser = await db.collection('users').insertOne(user);
  return newUser;
};

const findByEmail = async (email) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ email });
  return user;
}

const findAll = async () => {
  const db = await connection();
  const allUsers = db.collection('users').find().toArray();
  return allUsers;
}

module.exports = {
  newUser,
  findByEmail,
  findAll,
};