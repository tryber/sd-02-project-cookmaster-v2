const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findUserByName = async (name, id = null) =>
  connection().then((db) => db.collection('users')
    .findOne({ name, _id: { $ne: ObjectId(id) } }));

const findByEmail = async (email) =>
  connection().then((db) => db.collection('users')
    .findOne({ email }));

const findById = async (id) =>
  connection().then((db) => db.collection('users')
    .findOne({_id: ObjectId(id) }));

const createUser = async ({ name, email, password, role = 'user' }) =>
  connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }))
    .then(({ insertedId }) => ({ id: insertedId, name, email, password, role }));

module.exports = {
  findUserByName,
  findByEmail,
  createUser,
  findById,
}