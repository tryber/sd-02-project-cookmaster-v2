const connection = require('./connection');

async function create({ email, name, password }) {
  return connection().then((db) => db.collection('users').insertOne({ email, name, password }));
}

async function find({ email }) {
  return connection().then((db) => db.collection('users').findOne({ email }));
}

module.exports = {
  create,
  find,
};
