const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findByEmail = async (email, id = null) =>
  connection().then((db) => db.collection('users')
    .findOne({ email, _id: { $ne: ObjectId(id) } }));

const addUser = async ({ name, email, password, role = 'user' }) =>
  connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }))
    .then(({ insertedId }) => ({ id: insertedId, name, email, password, role }));

module.exports = {
  findByEmail,
  addUser,
}