const connection = require('./connection');

async function create({ email, name, password, role }) {
  return connection().then((db) =>
    db.collection('users').insertOne({ email, name, password, role: role || 'user' }),
  );
}

async function find({ email }) {
  return connection().then((db) => db.collection('users').findOne({ email }));
}

module.exports = {
  create,
  find,
};
