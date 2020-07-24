const connection = require('./connections');
const { ObjectId } = require('mongodb');

const createUser = async (user) => {
  try {
    const createdUser = connection()
      .then((db) => db.collection('users').insertOne(user))
      .then((result) => result.ops[0]);
    return createdUser;
  } catch (err) {
    console.error(err);
    return false;
  }
}

const findByEmail = async (email) => {
  try {
    const existUser = await connection()
      .then((db) => db.collection('users').findOne({ email }));
    return existUser;
  } catch (err) {
    console.error(err)
    return false;
  }
}

const findById = async (id) => {
  try {
    const existUser = await connection()
      .then((db) => db.collection('users').findOne({ _id: ObjectId(id) }));
    return existUser;
  } catch (err) {
    console.error(err)
    return false;
  }
}

module.exports = {
  createUser,
  findByEmail,
  findById,
};
