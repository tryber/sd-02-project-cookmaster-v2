const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findByEmail = async (email, id = null) =>
  connection().then((db) => db.collection('users')
    .findOne({ email, _id: { $ne: ObjectId(id) } }));

const addUser = async ({ name, email, password }) =>
  connection()
    .then((db) => db.collection('users').insertOne({ name, email, password }))
    .then(({ insertedId }) => ({ id: insertedId, name, email, password }));

module.exports = {
  findByEmail,
  addUser,
}