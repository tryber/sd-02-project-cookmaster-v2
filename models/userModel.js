const connection = require('./connection');

async function find({ email }) {
  return connection().then((db) => db.collection('users').findOne({ email }));
}

module.exports = {
  find,
};
